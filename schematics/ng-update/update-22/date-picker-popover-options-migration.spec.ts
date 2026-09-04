import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v22 date picker popover options migration', () => {
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    let tree!: Tree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        tree = factory.getTree();
    });

    it('should remove default thyOffset and thyHasBackdrop', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <div thyDatePicker thyOffset="4" thyHasBackdrop="true"></div>
                <div thyDatePicker [thyOffset]="4" [thyHasBackdrop]="true"></div>
                <div thyRangePicker thyHasBackdrop></div>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyOffset');
        expect(content).not.toContain('thyHasBackdrop');
        expect(content).not.toContain('thyPopoverOptions');
    });

    it('should migrate thyHasBackdrop false to thyPopoverOptions', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <thy-property-operation thyDatePicker [thyHasBackdrop]="false"></thy-property-operation>
                <div thyRangePicker thyHasBackdrop="false"></div>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyHasBackdrop');
        expect(content).toContain('[thyPopoverOptions]="{ hasBackdrop: false }"');
    });

    it('should migrate non-default thyOffset to thyPopoverOptions', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <div thyDatePicker thyOffset="0"></div>
                <div thyDatePicker [thyOffset]="offset"></div>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyOffset');
        expect(content).toContain('[thyPopoverOptions]="{ offset: 0 }"');
        expect(content).toContain('[thyPopoverOptions]="{ offset: offset }"');
    });

    it('should merge thyOffset and thyHasBackdrop into one thyPopoverOptions', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `<div thyDatePicker [thyOffset]="0" [thyHasBackdrop]="false"></div>`
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyOffset');
        expect(content).not.toContain('thyHasBackdrop');
        expect(content).toContain('[thyPopoverOptions]="{ offset: 0, hasBackdrop: false }"');
    });

    it('should migrate bound thyHasBackdrop to thyPopoverOptions', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(templatePath, `<div thyDatePicker [thyHasBackdrop]="hasBackdrop"></div>`);

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyHasBackdrop');
        expect(content).toContain('[thyPopoverOptions]="{ hasBackdrop: hasBackdrop }"');
    });

    it('should remove deprecated attrs when thyPopoverOptions already exists', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `<div thyDatePicker [thyOffset]="0" [thyHasBackdrop]="false" [thyPopoverOptions]="popoverOptions"></div>`
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        // 注意：migration 不会把 offset / hasBackdrop 合并进 popoverOptions，只会删掉 thyOffset 和 thyHasBackdrop。需要用户自己手动合并
        expect(content).not.toContain('thyOffset');
        expect(content).not.toContain('thyHasBackdrop');
        expect(content).toContain('[thyPopoverOptions]="popoverOptions"');
    });

    it('should migrate inline templates', async () => {
        const componentPath = '/projects/update-22-test/src/app/inline.component.ts';
        tree.create(
            componentPath,
            `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'app-inline',
                    template: \`<div thyDatePicker [thyHasBackdrop]="false"></div>\`
                })
                export class InlineComponent {}
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(componentPath);

        expect(content).not.toContain('thyHasBackdrop');
        expect(content).toContain('[thyPopoverOptions]="{ hasBackdrop: false }"');
    });

    it('should not change unrelated elements', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(templatePath, `<div [thyHasBackdrop]="false" [thyOffset]="0"></div>`);

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).toContain('[thyHasBackdrop]="false"');
        expect(content).toContain('[thyOffset]="0"');
        expect(content).not.toContain('thyPopoverOptions');
    });

    function migrate(sourceTree: Tree): Promise<UnitTestTree> {
        return schematicRunner.runSchematic('migration-v22', undefined, sourceTree);
    }
});
