import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { workspaces } from '@angular-devkit/core';
import {
    cdkMigrations,
    DevkitFileSystem,
    findStylesheetFiles,
    getTargetTsconfigPath,
    getWorkspaceConfigGracefully,
    isDevkitMigration,
    NullableDevkitMigration,
    TargetVersion,
    UpdateProject,
    UpgradeData,
    WorkspacePath
} from '@angular/cdk/schematics';
import { MigrationProgressReporter } from './migration-progress';

type PostMigrationFn = (context: SchematicContext, targetVersion: TargetVersion, hasFailure: boolean) => void;

interface MigrationPhase {
    label: string;
    migrations: NullableDevkitMigration[];
}

export function buildTwoPhaseMigrationPlan(extraMigrations: NullableDevkitMigration[]): MigrationPhase[] {
    return [
        { label: 'CDK rules', migrations: cdkMigrations },
        { label: 'Custom rules', migrations: extraMigrations }
    ].filter(phase => phase.migrations.length > 0);
}

/**
 * Two-phase batch migration:
 * 1. CDK rules batch + commit (renames and data-driven changes).
 * 2. Custom rules batch + commit (all point-edit migrations, including appearance rules).
 *
 * Requires custom template migrations to use attribute/tag-level edits instead of whole-template
 * replacement so they can safely run together after CDK output is committed.
 */
export function createTwoPhaseMigrationSchematicRule(
    targetVersion: TargetVersion,
    extraMigrations: NullableDevkitMigration[],
    upgradeData: UpgradeData,
    onMigrationCompleteFn?: PostMigrationFn
): Rule {
    return async (tree, context) => {
        const logger = context.logger;
        const workspace = await getWorkspaceConfigGracefully(tree);

        if (workspace === null) {
            logger.error('Could not find workspace configuration file.');
            return;
        }

        const fileSystem = new DevkitFileSystem(tree);
        const phases = buildTwoPhaseMigrationPlan(extraMigrations);
        const projectNames = [...workspace.projects.keys()];
        const totalSteps = countProjectTargets(workspace) * phases.length;
        const progress = new MigrationProgressReporter(totalSteps);
        let hasFailures = false;
        let completedSteps = 0;

        progress.start(`  Migrating to ${targetVersion} ...`);

        for (const phase of phases) {
            const stepResult = await runPhaseStep(
                tree,
                context,
                fileSystem,
                workspace,
                projectNames,
                phase.migrations,
                phase.label,
                progress,
                completedSteps,
                targetVersion,
                upgradeData,
                logger
            );
            completedSteps += stepResult.completedSteps;
            hasFailures = hasFailures || stepResult.hasFailures;
        }

        progress.complete('Done');
        logger.info('');

        const allMigrations = phases.flatMap(phase => phase.migrations);
        let runPackageManager = false;

        allMigrations.forEach(migration => {
            const actionResult =
                isDevkitMigration(migration) && migration.globalPostMigration !== undefined
                    ? migration.globalPostMigration(tree, targetVersion, context)
                    : null;

            if (actionResult) {
                runPackageManager = runPackageManager || actionResult.runPackageManager;
            }
        });

        if (runPackageManager) {
            context.addTask(new NodePackageInstallTask({ quiet: false }));
        }

        if (onMigrationCompleteFn) {
            onMigrationCompleteFn(context, targetVersion, hasFailures);
        }
    };
}

async function runPhaseStep(
    tree: Tree,
    context: SchematicContext,
    fileSystem: DevkitFileSystem,
    workspace: workspaces.WorkspaceDefinition,
    projectNames: string[],
    migrations: NullableDevkitMigration[],
    progressLabel: string,
    progress: MigrationProgressReporter,
    completedSteps: number,
    targetVersion: TargetVersion,
    upgradeData: UpgradeData,
    logger: SchematicContext['logger']
): Promise<{ completedSteps: number; hasFailures: boolean }> {
    let hasFailures = false;
    let steps = 0;
    // Shared across projects so monorepo source files are only migrated once per phase.
    // Uncommitted edits are invisible to fileSystem.read(), so revisiting the same template
    // in another project would otherwise queue duplicate attribute inserts.
    const analyzedFiles = new Set<WorkspacePath>();

    for (const projectName of projectNames) {
        const project = workspace.projects.get(projectName);

        if (!project) {
            continue;
        }

        const buildTsconfigPath = getTargetTsconfigPath(project, 'build');
        const testTsconfigPath = getTargetTsconfigPath(project, 'test');

        if (!buildTsconfigPath && !testTsconfigPath) {
            logger.warn(`Skipping migration for project ${projectName}. Unable to determine 'tsconfig.json' file in workspace config.`);
            continue;
        }

        const additionalStylesheetPaths = findStylesheetFiles(tree, project.root);

        if (buildTsconfigPath !== null) {
            steps += 1;
            progress.update(completedSteps + steps, progressLabel);
            hasFailures =
                hasFailures ||
                runProjectMigrations(
                    tree,
                    project,
                    projectName,
                    buildTsconfigPath,
                    additionalStylesheetPaths,
                    false,
                    migrations,
                    analyzedFiles,
                    fileSystem,
                    targetVersion,
                    upgradeData,
                    context
                );
        }

        if (testTsconfigPath !== null) {
            steps += 1;
            progress.update(completedSteps + steps, progressLabel);
            hasFailures =
                hasFailures ||
                runProjectMigrations(
                    tree,
                    project,
                    projectName,
                    testTsconfigPath,
                    additionalStylesheetPaths,
                    true,
                    migrations,
                    analyzedFiles,
                    fileSystem,
                    targetVersion,
                    upgradeData,
                    context
                );
        }

        fileSystem.commitEdits();
    }

    return { completedSteps: steps, hasFailures };
}

function countProjectTargets(workspace: workspaces.WorkspaceDefinition): number {
    let targetCount = 0;

    for (const projectName of workspace.projects.keys()) {
        const project = workspace.projects.get(projectName);

        if (!project) {
            continue;
        }

        if (getTargetTsconfigPath(project, 'build') !== null) {
            targetCount += 1;
        }

        if (getTargetTsconfigPath(project, 'test') !== null) {
            targetCount += 1;
        }
    }

    return targetCount;
}

function runProjectMigrations(
    tree: Tree,
    project: workspaces.ProjectDefinition,
    projectName: string,
    tsconfigPath: WorkspacePath,
    additionalStylesheetPaths: string[],
    isTestTarget: boolean,
    migrations: NullableDevkitMigration[],
    analyzedFiles: Set<WorkspacePath>,
    fileSystem: DevkitFileSystem,
    targetVersion: TargetVersion,
    upgradeData: UpgradeData,
    context: SchematicContext
): boolean {
    const program = UpdateProject.createProgramFromTsconfig(tsconfigPath, fileSystem);
    const updateProject = new UpdateProject(
        {
            isTestTarget,
            projectName,
            project,
            tree
        },
        program,
        fileSystem,
        analyzedFiles,
        context.logger
    );

    return updateProject.migrate(migrations, targetVersion, upgradeData, additionalStylesheetPaths).hasFailures;
}
