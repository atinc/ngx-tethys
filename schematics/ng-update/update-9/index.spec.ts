import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestEnvironment } from '../../testing';

describe('ng-update v9 Schematic', () => {
    let tree: Tree;
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));

    let workspaceTree: UnitTestTree;
    beforeEach(async () => {
        tree = await createTestEnvironment();
        workspaceTree = await schematicRunner.runSchematicAsync('migration-01', undefined, tree).toPromise();
    });

    it(`should entry point change`, async () => {
        const result = workspaceTree.read('/src/app/module1.ts').toString();
        expect(result).toContain('import { Id, PaginationInfo } from "ngx-tethys/types";');
        expect(result).not.toContain(`import { Id,PaginationInfo } from 'ngx-tethys/store';`);
    });
    it(`should "ngx-tethys/typings" to "ngx-tethys/types"`, async () => {
        const result = workspaceTree.read('/src/app/module1.ts').toString();
        expect(result).toContain(`ngx-tethys/types`);
        expect(result).not.toContain('ngx-tethys/typings');
    });
    it(`should multi level entry point to second`, async () => {
        const result = workspaceTree.read('/src/app/module1.ts').toString();
        const list = result.match(/"ngx-tethys\/[^"]*"/g);
        list.forEach(str => {
            expect(str.split('/').length).toBe(2);
        });
    });
    it(`should classify entry point`, async () => {
        const result = workspaceTree.read('/src/app/module1.ts').toString();
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
