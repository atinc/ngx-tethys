import { HostTree, Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

describe('ng-update v16 Schematic', () => {
    let tree: Tree;
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    const TEST_MODULE_PATH = '/projects/update16test/src/app/module.ts';
    let workspaceTree: UnitTestTree;
    const hostTree = new HostTree();

    beforeEach(async () => {
        tree = await schematicRunner
            .runExternalSchematicAsync(
                '@schematics/angular',
                'workspace',
                {
                    name: 'test-workspace',
                    version: '16.0.0',
                    newProjectRoot: 'projects'
                },
                hostTree
            )
            .toPromise();

        await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', { name: 'update16test' }, tree).toPromise();
        hostTree.create(
            TEST_MODULE_PATH,
            `
            import { NgModule } from '@angular/core';
            import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

            import { ThyIconModule, ThyIconRegistry } from 'ngx-tethys/icon';
            import { ThyLabelModule } from 'ngx-tethys/label';
            import { ThyActionMenuModule } from 'ngx-tethys/action-menu';


            @NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                BrowserModule,
                ThyLabelModule,
                ThyIconModule,
                ThyActionMenuModule
            ],
            providers: [],
            bootstrap: [AppComponent],
            exports: [ThyLabelModule]
            })
            export class AppModule {
            constructor(iconRegistry: ThyIconRegistry, sanitizer: DomSanitizer) {
                // 注册 defs SVG 雪碧图
                iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('assets / icons / defs / svg / sprite.defs.svg'));
                // 注册 symbol SVG 雪碧图
                iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('assets / icons / symbol / svg / sprite.defs.svg'));
            }
            }
            `
        );
        tree.overwrite('/projects/update16test/src/main.ts', `import './app/module';`);
        workspaceTree = await schematicRunner.runSchematicAsync('migration-v16', {}, tree).toPromise();
    });

    it(`should update ThyLabelModule to ThyTagModule and ThyActionMenuModule to ThyDropdownModule`, async () => {
        const result = workspaceTree.readContent(TEST_MODULE_PATH);
        expect(result).toContain(`import { ThyTagModule } from 'ngx-tethys/tag';`);
        expect(result).not.toContain(`import { ThyLabelModule } from 'ngx-tethys/label';`);
        expect(result).toContain(`import { ThyDropdownModule } from 'ngx-tethys/dropdown';`);
        expect(result).not.toContain(`import { ThyActionMenuModule } from 'ngx-tethys/action-menu';`);
    });
});
