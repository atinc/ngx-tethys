import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { DEPENDENCIES } from '../dependencies';
import { createTestWorkspaceFactory, getJsonFileContent } from '../testing';
import { addPackageToPackageJson } from '../utils';
import { VERSION } from '../version';

describe('ng-add Schematic', () => {
    let tree: Tree;
    const schematicRunner = new SchematicTestRunner('ngx-tethys', require.resolve('../collection.json'));

    let workspaceTree: UnitTestTree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'ngx-tethys-chen' });
        tree = factory.getTree();
    });

    it('should update package.json', async () => {
        workspaceTree = await schematicRunner.runSchematicAsync('ng-add', undefined, tree).toPromise();
        const packageJson = getJsonFileContent(workspaceTree, '/package.json');
        const dependencies = packageJson.dependencies;
        expect(dependencies['date-fns']).toEqual(DEPENDENCIES['date-fns']);
        expect(dependencies['@tethys/icons']).toBeTruthy();
        expect(dependencies['@angular/cdk']).toEqual(DEPENDENCIES['@angular/cdk']);
        expect(dependencies['ngx-tethys']).toEqual(VERSION);
        expect(schematicRunner.tasks.some(task => task.name === 'node-package')).toBe(true);
    });

    it('should respect version range from CLI ng-add command', async () => {
        // Simulates the behavior of the CLI `ng add` command. The command inserts the
        // requested package version into the `package.json` before the actual schematic runs.
        addPackageToPackageJson(tree, 'ngx-tethys', '^9.0.0');

        workspaceTree = await schematicRunner.runSchematicAsync('ng-add', {}, tree).toPromise();
        const packageJson = getJsonFileContent(workspaceTree, '/package.json');
        const dependencies = packageJson.dependencies;

        expect(dependencies['ngx-tethys']).toBe('^9.0.0');
        expect(schematicRunner.tasks.some(task => task.name === 'node-package')).toBe(true);
    });

    it(`should add styles`, async () => {
        workspaceTree = await schematicRunner.runSchematicAsync('ng-add', undefined, tree).toPromise();

        const workspace = getJsonFileContent(workspaceTree, '/angular.json');
        const defaultProject = workspace.defaultProject;
        const existStyle = workspace.projects[defaultProject].architect.build.options.styles.includes(
            './node_modules/ngx-tethys/styles/main.bundle.scss'
        );

        expect(existStyle).toBe(true);
    });

    it(`should add styles in [ngx-tethys-chen] project`, async () => {
        workspaceTree = await schematicRunner.runSchematicAsync('ng-add', { project: 'ngx-tethys-chen' }, tree).toPromise();

        const workspace = getJsonFileContent(workspaceTree, '/angular.json');
        const existStyle = workspace.projects['ngx-tethys-chen'].architect.build.options.styles.includes(
            './node_modules/ngx-tethys/styles/main.bundle.scss'
        );

        expect(existStyle).toBe(true);
    });

    it(`should add icons`, async () => {
        workspaceTree = await schematicRunner.runSchematicAsync('ng-add', { icon: true }, tree).toPromise();

        const workspace = getJsonFileContent(workspaceTree, '/angular.json');
        const defaultProject = workspace.defaultProject;

        const existIcon = workspace.projects[defaultProject].architect.build.options.assets.find(
            a => typeof a === 'object' && a.input === './node_modules/@tethys/icons'
        );
        expect(existIcon).toEqual({
            glob: '**/*',
            input: './node_modules/@tethys/icons',
            output: '/assets/icons/'
        });
    });

    it(`should not icons`, async () => {
        workspaceTree = await schematicRunner.runSchematicAsync('ng-add', { icon: false }, tree).toPromise();

        const workspace = getJsonFileContent(workspaceTree, '/angular.json');
        const defaultProject = workspace.defaultProject;

        const existIcon = workspace.projects[defaultProject].architect.build.options.assets.find(
            a => typeof a === 'object' && a.input === './node_modules/@tethys/icons'
        );
        expect(existIcon).not.toEqual({
            glob: '**/*',
            input: './node_modules/@tethys/icons',
            output: '/assets/icons/'
        });
    });
});
