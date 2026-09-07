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

    it('should migrate thy-input-group thySize xs to sm', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <thy-input-group thySize="xs"></thy-input-group>
                <thy-input-group [thySize]="'xs'"></thy-input-group>
                <thy-input thySize="xs"></thy-input>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).toContain('<thy-input-group thySize="sm">');
        expect(content).toContain(`<thy-input-group [thySize]="'sm'">`);
        expect(content).toContain('<thy-input thySize="xs">');
    });

    it('should migrate attribute directive forms like thyDatePicker, thyRangePicker, thySelectControl', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <input thyDatePicker/>
                <input thyRangePicker/>
                <div thySelectControl></div>
                <thy-select-control></thy-select-control>
                <div thy-cascader></div>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).toContain('<input thyDatePicker thySize="lg"');
        expect(content).toContain('<input thyRangePicker thySize="lg"');
        expect(content).toContain('<div thySelectControl thySize="lg"></div>');
        expect(content).toContain('<thy-select-control thySize="lg"></thy-select-control>');
        expect(content).toContain('<div thy-cascader thySize="lg"></div>');
    });

    it('should not duplicate thySize when workspace has multiple applications', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'app-one' });
        await factory.addApplication({ name: 'app-two' });
        tree = factory.getTree();

        const sharedTemplate = '/projects/app-one/src/app/app.html';
        tree.overwrite(
            sharedTemplate,
            `
                <thy-input-search></thy-input-search>
                <input thyInput />
            `
        );
        tree.create(
            '/projects/app-two/src/app/shared-demo.component.ts',
            `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'app-shared-demo',
                    templateUrl: '../../app-one/src/app/app.html'
                })
                export class SharedDemoComponent {}
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(sharedTemplate);

        expect(content.match(/thySize="lg"/g)?.length).toBe(2);
        expect(content).not.toMatch(/thySize="lg"\s+thySize="lg"/);
    });

    it('should stay idempotent when migration-v22 runs multiple times', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <thy-input-group thySize="lg">
                    <input thyInput thySize="lg" />
                </thy-input-group>
                <button thyButton="link-secondary" thySize="lg">Cancel</button>
            `
        );

        const once = await migrate(tree);
        const twice = await migrate(once);
        const thrice = await migrate(twice);
        const content = thrice.readContent(templatePath);

        expect(content).toContain('<thy-input-group thySize="lg">');
        expect(content).toContain('thyInput thySize="lg"');
        expect(content).toContain('<button thyButton="default" thyAppearance="link" thySize="lg">Cancel</button>');
        expect(content).not.toMatch(/thySize="lg"\s+thySize="lg"/);
        expect(content).not.toMatch(/thyAppearance="link"\s+thyAppearance="link"/);
        expect(twice.readContent(templatePath)).toBe(content);
    });

    function migrate(sourceTree: Tree): Promise<UnitTestTree> {
        return schematicRunner.runSchematic('migration-v22', undefined, sourceTree);
    }
});
