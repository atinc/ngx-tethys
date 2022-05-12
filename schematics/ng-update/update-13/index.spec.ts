import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';
describe('ng-update v12 Schematic', () => {
    let tree: Tree;
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    const TEST_MODULE_PATH = '/projects/update12test/src/app/module1.ts';
    const TEST_HTML_PATH = '/projects/update12test/src/app/app.component.html';
    let workspaceTree: UnitTestTree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update12test' });
        await factory.addNewFile(
            TEST_MODULE_PATH,
            `
            import { Store } from 'ngx-tethys/store';
            console.log(Store)
            class TestClass{
                test(a:Store){}
            }
          {  }
`
        );
        tree = factory.getTree();
        tree.overwrite('/projects/update12test/src/main.ts', `import './app/module1';`);
        tree.overwrite(TEST_HTML_PATH, ``);
        workspaceTree = await schematicRunner.runSchematicAsync('migration-v12', undefined, tree).toPromise();
    });

    it(`should "ngx-tethys/store" to "@tethys/store"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain('@tethys/store');
        expect(result).not.toContain(`ngx-tethys/store`);
    });
});
