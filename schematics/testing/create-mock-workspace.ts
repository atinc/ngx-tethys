import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

export async function createTestApp(runner: SchematicTestRunner, appOptions = {}, tree?: Tree): Promise<UnitTestTree> {
    return createTestProject(runner, 'application', appOptions, tree);
}
async function createTestProject(
    runner: SchematicTestRunner,
    projectType: 'application' | 'library',
    appOptions = {},
    tree?: Tree
): Promise<UnitTestTree> {
    let workspaceTree;
    if (!tree) {
        workspaceTree = await runner
            .runExternalSchematicAsync(
                '@schematics/angular',
                'workspace',
                {
                    name: 'workspace',
                    version: '6.0.0',
                    newProjectRoot: 'projects'
                },
                tree
            )
            .toPromise();
    } else {
        workspaceTree = tree;
    }

    return runner
        .runExternalSchematicAsync('@schematics/angular', projectType, { name: 'ngx-tethys-test', ...appOptions }, workspaceTree)
        .toPromise();
}
