import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v13 Schematic', () => {
    let tree: Tree;
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    const TEST_MODULE_PATH = '/projects/update13test/src/app/module1.ts';
    const TEST_HTML_PATH = '/projects/update13test/src/app/app.component.html';
    let workspaceTree: UnitTestTree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update13test' });
        await factory.addNewFile(
            TEST_MODULE_PATH,
            `
            import { Store } from 'ngx-tethys/store';
            import { ThyRasterModule } from 'ngx-tethys/raster';
            import { ThyRasterModule as RasterModule } from 'ngx-tethys/raster';
            import { ThyUploaderModule } from 'ngx-tethys/uploader';
            import { ThyDropdownModule, ThyEmptyModule } from 'ngx-tethys';
            class TestClass{
                test(a:ThyRasterModule){
                    console.log(ThyRasterModule)
                }
            }`
        );
        tree = factory.getTree();
        tree.overwrite('/projects/update13test/src/main.ts', `import './app/module1';`);
        tree.overwrite(
            TEST_HTML_PATH,
            `<thy-grid>

        </thy-grid>`
        );
        workspaceTree = await schematicRunner.runSchematicAsync('migration-v13', undefined, tree).toPromise();
    });

    it(`should "ngx-tethys/store" to "@tethys/store"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain('@tethys/store');
        expect(result).not.toContain(`ngx-tethys/store`);
    });

    it(`should "ngx-tethys/raster" to "ngx-tethys/grid"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain('ngx-tethys/grid');
        expect(result).not.toContain(`ngx-tethys/raster`);
    });

    it(`should "ThyRasterModule" to "ThyGridModule"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain('ThyGridModule');
        expect(result).not.toContain(`ThyRasterModule`);
        expect(result).toContain('a:ThyGridModule');
        expect(result).not.toContain('a:ThyRasterModule');
        expect(result).toContain(' console.log(ThyGridModule)');
        expect(result).not.toContain(' console.log(ThyRasterModule)');
    });

    it(`should "ngx-tethys/uploader" to "ngx-tethys/upload"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain('ngx-tethys/upload');
        expect(result).not.toContain(`ngx-tethys/uploader`);
    });

    it(`should import from secondary file`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain(`import { ThyDropdownModule } from "ngx-tethys/dropdown"`);
        expect(result).toContain(`import { ThyEmptyModule } from "ngx-tethys/empty"`);
        expect(result).not.toContain(`import { ThyDropdownModule, ThyEmptyModule } from "ngx-tethys"`);
    });
});
