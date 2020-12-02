import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestApp, getJsonFileContent } from '../testing';

describe('ng-add Schematic', () => {
    let tree: Tree;
    const schematicRunner = new SchematicTestRunner('ngx-tethys', require.resolve('../collection.json'));

    let workspaceTree: UnitTestTree;

    beforeEach(async () => {
        tree = await createTestApp(schematicRunner);
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
        tree = await createTestApp(schematicRunner, { name: 'ngx-tethys-chen' }, tree);
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
