import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';
describe('ng-update v11 Schematic', () => {
    let tree: Tree;
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    const TEST_MODULE_PATH = '/projects/update11test/src/app/module1.ts';
    let workspaceTree: UnitTestTree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update11test' });
        await factory.addNewFile(
            TEST_MODULE_PATH,
            `
            import { xxx,yyy } from 'ngx-tethys/thy-grid'
`
        );
        tree = factory.getTree();
        tree.overwrite('/projects/update11test/src/main.ts', `import './app/module1';`);
        workspaceTree = await schematicRunner.runSchematicAsync('migration-v11', undefined, tree).toPromise();
    });

    it(`should "ngx-tethys/thy-grid" to "ngx-tethys/thy-table"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain('ngx-tethys/thy-table');
        expect(result).not.toContain(`ngx-tethys/thy-grid`);
    });
});
