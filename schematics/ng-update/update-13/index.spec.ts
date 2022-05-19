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
            import { NgxTethysModule } from "ngx-tethys";
            import { Store } from "ngx-tethys/store";
            import { Action } from "ngx-tethys";
            import { coerceArray, helpers as ngxTethysHelpers, mergeReferences, produce } from 'ngx-tethys';
            import { ThyRasterModule } from 'ngx-tethys/raster';
            import { ThyRasterModule } from 'ngx-tethys';
            import { ThyRasterModule as RasterModule } from 'ngx-tethys/raster';
            import { ThyUploaderModule, ThyUploaderService, ThyUploaderConfig, THY_UPLOADER_DEFAULT_OPTIONS, THY_UPLOADER_DEFAULT_OPTIONS_PROVIDER } from 'ngx-tethys/uploader';
            import { ThyDropdownModule, ThyEmptyModule, ThyUploaderService } from 'ngx-tethys';
            class TestClass{
                test(a:ThyRasterModule, thyUploaderService: ThyUploaderService, thyUploaderConfig: ThyUploaderConfig, uploadOption: THY_UPLOADER_DEFAULT_OPTIONS ){
                    console.log(ThyRasterModule);
                    console.log(ThyUploaderModule);
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
        expect(result).toContain(`import { Store } from '@tethys/store'`);
        expect(result).not.toContain(`import { Action } from "ngx-tethys"`);
        expect(result).not.toContain(`import { Action } from "ngx-tethys/store"`);
        expect(result).not.toContain(`import { Action } from 'ngx-tethys/store'`);
        expect(result).not.toContain(`import { Action } from 'ngx-tethys'`);
    });

    it(`should import NgxTethysModule from "ngx-tethys"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain(`import { NgxTethysModule } from 'ngx-tethys'`);
    });

    it(`should "ngx-tethys/raster" to "ngx-tethys/grid"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain(`import { ThyGridModule } from 'ngx-tethys/grid';`);
        expect(result).not.toContain(`import { ThyRasterModule } from 'ngx-tethys'`);
    });

    it(`should "ngx-tethys" to "ngx-tethys/grid"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain('ngx-tethys/grid');
        expect(result).not.toContain(`ngx-tethys/raster`);
    });

    it(`should "ThyRaster*" to "ThyGrid*"`, async () => {
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

    it(`should "ThyUploader*" to "ThyUpload*"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain('console.log(ThyUploadModule)');
        expect(result).not.toContain('console.log(ThyUploaderModule)');
        expect(result).toContain('ThyUploadService');
        expect(result).not.toContain(`ThyUploaderService`);
        expect(result).toContain('thyUploaderService: ThyUploadService');
        expect(result).not.toContain('thyUploaderService: ThyUploaderService');
        expect(result).toContain(`ThyUploadConfig`);
        expect(result).not.toContain('ThyUploaderConfig');
        expect(result).toContain('thyUploaderConfig: ThyUploadConfig');
        expect(result).not.toContain('thyUploaderConfig: ThyUploaderConfig');
        expect(result).toContain(`THY_UPLOAD_DEFAULT_OPTIONS`);
        expect(result).not.toContain('THY_UPLOADER_DEFAULT_OPTIONS');
        expect(result).toContain('uploadOption: THY_UPLOAD_DEFAULT_OPTIONS');
        expect(result).not.toContain('uploadOption: THY_UPLOADER_DEFAULT_OPTIONS');
        expect(result).toContain(`THY_UPLOAD_DEFAULT_OPTIONS_PROVIDER`);
        expect(result).not.toContain('THY_UPLOADER_DEFAULT_OPTIONS_PROVIDER');
    });

    it(`should import from secondary file`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain(`import { ThyDropdownModule } from 'ngx-tethys/dropdown'`);
        expect(result).toContain(`import { ThyEmptyModule } from 'ngx-tethys/empty'`);
        expect(result).toContain(`import { ThyUploadService } from 'ngx-tethys/upload'`);
        expect(result).not.toContain(`import { ThyDropdownModule, ThyEmptyModule, ThyUploaderService } from 'ngx-tethys'`);
    });

    it(`should import ngx-tethys/util when importModule has alias`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain(`import { coerceArray, helpers as ngxTethysHelpers, mergeReferences, produce } from 'ngx-tethys/util'`);
    });
});
