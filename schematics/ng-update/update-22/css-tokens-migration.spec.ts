import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v22 CSS token migration', () => {
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    let tree!: Tree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        tree = factory.getTree();
    });

    it('should migrate removed Sass variables through UpgradeData.cssTokens', async () => {
        const stylePath = '/projects/update-22-test/src/styles.scss';
        tree.create(
            stylePath,
            `
                @use 'ngx-tethys/styles/variables' as variables;
                @use 'ngx-tethys/styles/basic' as basic;

                .editor {
                    height: variables.$input-btn-height;
                    padding: variables.$input-padding-y variables.$input-padding-x;
                    border-radius: basic.$input-border-radius;
                }

                .tooltip {
                    padding: variables.$btn-icon-circle-padding-base;
                }
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(stylePath);

        expect(content).toContain('height: variables.$input-btn-height-lg;');
        expect(content).toContain('padding: variables.$input-padding-y-lg variables.$input-padding-x-lg;');
        expect(content).toContain('border-radius: basic.$input-border-radius-lg;');
        expect(content).toContain('padding: variables.$btn-icon-circle-padding-lg;');
    });

    it('should migrate inline component styles', async () => {
        const componentPath = '/projects/update-22-test/src/app/inline-style.component.ts';
        tree.create(
            componentPath,
            `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'app-inline-style',
                    template: '',
                    styles: [\`.editor { padding: variables.$input-padding-y variables.$input-padding-x; }\`]
                })
                export class InlineStyleComponent {}
            `
        );

        const result = await migrate(tree);

        expect(result.readContent(componentPath)).toContain('padding: variables.$input-padding-y-lg variables.$input-padding-x-lg;');
    });

    it('should not replace partial or already sized token names', async () => {
        const stylePath = '/projects/update-22-test/src/styles.scss';
        tree.create(
            stylePath,
            `
                .editor {
                    padding: variables.$input-padding-x-md variables.$input-padding-y-lg;
                    min-height: variables.$input-btn-height-lg;
                }
            `
        );

        const result = await migrate(tree);

        expect(result.readContent(stylePath)).toBe(tree.readText(stylePath));
    });

    function migrate(sourceTree: Tree): Promise<UnitTestTree> {
        return schematicRunner.runSchematic('migration-v22', undefined, sourceTree);
    }
});
