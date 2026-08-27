import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v22 input control size migration', () => {
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    let tree!: Tree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        tree = factory.getTree();
    });

    it('should preserve the old visual size for external templates', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <button thyButton>Button</button>
                <thy-button thySize="default">Button</thy-button>
                <thy-button-icon thyButtonIcon="add" thySize></thy-button-icon>
                <input thyInput thySize="" />
                <thy-input-group [thySize]="'default'"></thy-input-group>
                <thy-input-number [thySize]="''"></thy-input-number>
                <thy-select [thySize]="size"></thy-select>
                <thy-date-picker></thy-date-picker>
                <thy-time-picker thySize="md"></thy-time-picker>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).toContain('<button thyButton thySize="lg">');
        expect(content).toContain('<thy-button thySize="lg">');
        expect(content).toContain('<thy-button-icon thyButtonIcon="add" thySize="lg">');
        expect(content).toContain('<input thyInput thySize="lg" />');
        expect(content).toContain(`<thy-input-group [thySize]="'lg'">`);
        expect(content).toContain(`<thy-input-number [thySize]="'lg'">`);
        expect(content).toContain('<thy-select [thySize]="size">');
        expect(content).toContain('<thy-date-picker thySize="lg">');
        expect(content).toContain('<thy-time-picker thySize="md">');
    });

    it('should migrate inline templates', async () => {
        const componentPath = '/projects/update-22-test/src/app/inline.component.ts';
        tree.create(
            componentPath,
            `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'app-inline',
                    template: \`<thy-input></thy-input><button thy-button thySize="default">Save</button>\`
                })
                export class InlineComponent {}
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(componentPath);

        expect(content).toContain('<thy-input thySize="lg">');
        expect(content).toContain('<button thy-button thySize="lg">');
    });

    it('should not change unrelated thySize inputs', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <thy-avatar thySize="default"></thy-avatar>
                <thy-pagination></thy-pagination>
                <div thySize="default"></div>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).toContain('<thy-avatar thySize="default">');
        expect(content).toContain('<thy-pagination></thy-pagination>');
        expect(content).toContain('<div thySize="default">');
    });

    it('should migrate removed Sass variables to equivalent lg variables', async () => {
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

    it('should migrate indented Sass syntax and inline component styles', async () => {
        const sassPath = '/projects/update-22-test/src/legacy.sass';
        tree.create(sassPath, `.editor\n  height: $input-btn-height\n  padding: $input-padding-y $input-padding-x\n`);

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

        expect(result.readContent(sassPath)).toContain('height: $input-btn-height-lg');
        expect(result.readContent(sassPath)).toContain('padding: $input-padding-y-lg $input-padding-x-lg');
        expect(result.readContent(componentPath)).toContain('padding: variables.$input-padding-y-lg variables.$input-padding-x-lg;');
    });

    it('should not migrate comments, strings, or already sized variables', async () => {
        const stylePath = '/projects/update-22-test/src/unchanged.scss';
        tree.create(
            stylePath,
            `
                // variables.$input-padding-x
                /* variables.$input-padding-y */
                $description: 'variables.$input-btn-height';
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
