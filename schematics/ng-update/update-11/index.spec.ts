import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';
describe('ng-update v11 Schematic', () => {
    let tree: Tree;
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    const TEST_MODULE_PATH = '/projects/update11test/src/app/module1.ts';
    const TEST_HTML_PATH = '/projects/update11test/src/app/app.component.html';
    let workspaceTree: UnitTestTree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update11test' });
        await factory.addNewFile(
            TEST_MODULE_PATH,
            `
            import { Dictionary } from 'ngx-tethys/types';
            import { ThyGridModule,ThyGridColumn } from 'ngx-tethys/grid'
            console.log(ThyGridModule)
          {  let ThyGridColumn='not to be convert'}
            @Component({
                template: '<thy-grid></thy-grid>',
            })
            export class TestComponent implements OnInit {}
`
        );
        tree = factory.getTree();
        tree.overwrite('/projects/update11test/src/main.ts', `import './app/module1';`);
        tree.overwrite(
            TEST_HTML_PATH,
            `<thy-grid>

        </thy-grid>`
        );
        workspaceTree = await schematicRunner.runSchematicAsync('migration-v11', undefined, tree).toPromise();
    });

    it(`should "ngx-tethys/grid" to "ngx-tethys/table"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain('ngx-tethys/table');
        expect(result).not.toContain(`ngx-tethys/grid`);
    });
    it(`should "ThyGridModule" to "ThyTableModule"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain(`import { Dictionary } from 'ngx-tethys/types';`);
        expect(result).toContain(`ThyTableModule`);
        expect(result).toContain(`console.log(ThyTableModule)`);
        expect(result).not.toContain('ThyGridModule');
    });
    it(`should not convert "ThyGridColumn" when without relation`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain(`let ThyGridColumn='not to be convert'`);
        expect(result).toContain(`ThyTableColumn`);
    });
    it(`should templateUrl "thy-grid" to "thy-table"`, async () => {
        const result = workspaceTree.read(TEST_HTML_PATH).toString();
        expect(result).toContain('thy-table');
        expect(result).not.toContain(`thy-grid`);
    });
    it(`should template "thy-grid" to "thy-table"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain('thy-table');
        expect(result).not.toContain(`thy-grid`);
    });
});
