import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';
describe('ng-update v9 Schematic', () => {
    let tree: Tree;
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    const TEST_MODULE_PATH = '/projects/update9test/src/app/module1.ts';
    let workspaceTree: UnitTestTree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update9test' });
        await factory.addNewFile(
            TEST_MODULE_PATH,
            `// 入口点二级化测试
        import { THY_CONFIRM_DEFAULT_OPTIONS, ThyConfirmConfig, ThyDialog ,NgxTethysModule, NotAName } from 'ngx-tethys';
        import {yyy} from 'ngx-tethys'
        import {
          ThyInputModule,
          ThyOptionModule,
          ThySelectModule,
          ThyDatePickerModule,
          ThyGridModule,
          ThyRasterModule,
          ThyIconModule,
          ThyDialogModule,
          ThyNotifyModule,
        } from 'ngx-tethys';
        // 入口点截取测试
        import { isString } from 'ngx-tethys/util/helpers';
        // 入口点变更测试
        import { Id,PaginationInfo } from 'ngx-tethys/store';
        // typings 转 types 替换
        import { xxx,yyy } from 'ngx-tethys/typings'
        // 混淆
        import { chen } from 'my-package'`
        );

        tree = factory.getTree();

        tree.overwrite('/projects/update9test/src/main.ts', `import './app/module1';`);

        workspaceTree = await schematicRunner.runSchematicAsync('migration-v9', undefined, tree).toPromise();
    });

    it(`should entry point change`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain('import { Id, PaginationInfo } from "ngx-tethys/types";');
        expect(result).not.toContain(`import { Id,PaginationInfo } from 'ngx-tethys/store';`);
    });

    it(`should "ngx-tethys/typings" to "ngx-tethys/types"`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        expect(result).toContain(`ngx-tethys/types`);
        expect(result).not.toContain('ngx-tethys/typings');
    });

    it(`should multi level entry point to second`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        const list = result.match(/"ngx-tethys\/[^"]*"/g);
        list.forEach(str => {
            expect(str.split('/').length).toBe(2);
        });
    });

    it(`should classify entry point`, async () => {
        const result = workspaceTree.read(TEST_MODULE_PATH).toString();
        [
            `import { ThyInputModule } from "ngx-tethys/input";`,
            `import { ThyOptionModule } from "ngx-tethys/shared";`,
            `import { ThySelectModule } from "ngx-tethys/select";`,
            `import { ThyDatePickerModule } from "ngx-tethys/date-picker";`,
            `import { ThyGridModule } from "ngx-tethys/grid";`,
            `import { ThyRasterModule } from "ngx-tethys/raster";`,
            `import { ThyIconModule } from "ngx-tethys/icon";`,
            `import { ThyDialogModule } from "ngx-tethys/dialog";`,
            `import { ThyNotifyModule } from "ngx-tethys/notify";`
        ].forEach(str => {
            expect(result).toContain(str);
        });
        expect(result).not.toContain(`import {
            ThyInputModule,
            ThyOptionModule,
            ThySelectModule,
            ThyDatePickerModule,
            ThyGridModule,
            ThyRasterModule,
            ThyIconModule,
            ThyDialogModule,
            ThyNotifyModule,
          } from 'ngx-tethys';`);
    });
});
