import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v22 CSS selector migration', () => {
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    let tree!: Tree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        tree = factory.getTree();
    });

    it('should migrate dialog-supper-lg to dialog-super-lg in stylesheets', async () => {
        const stylePath = '/projects/update-22-test/src/styles.scss';
        tree.create(
            stylePath,
            `
                .cdk-overlay-pane.dialog-supper-lg {
                    width: 94vw;
                }
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(stylePath);

        expect(content).toContain('.cdk-overlay-pane.dialog-super-lg');
        expect(content).not.toContain('dialog-supper-lg');
    });

    it('should migrate dialog-supper-lg to dialog-super-lg in component templates', async () => {
        const componentPath = '/projects/update-22-test/src/app/dialog-style-demo.component.ts';
        tree.create(
            componentPath,
            `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'app-dialog-style-demo',
                    template: \`<div class="dialog-supper-lg">Dialog</div>\`
                })
                export class DialogStyleDemoComponent {}
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(componentPath);

        expect(content).toContain('class="dialog-super-lg"');
        expect(content).not.toContain('dialog-supper-lg');
    });

    it('should migrate dialog-supper-lg to dialog-super-lg in inline component styles', async () => {
        const componentPath = '/projects/update-22-test/src/app/dialog-inline-style.component.ts';
        tree.create(
            componentPath,
            `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'app-dialog-inline-style',
                    template: '',
                    styles: [\`.dialog-supper-lg { width: 94vw; }\`]
                })
                export class DialogInlineStyleComponent {}
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(componentPath);

        expect(content).toContain('.dialog-super-lg');
        expect(content).not.toContain('dialog-supper-lg');
    });

    it('should not replace dialog-super-lg', async () => {
        const stylePath = '/projects/update-22-test/src/styles.scss';
        tree.create(
            stylePath,
            `
                .cdk-overlay-pane.dialog-super-lg {
                    width: 94vw;
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
