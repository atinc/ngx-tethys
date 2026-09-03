import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v22 table show header migration', () => {
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    let tree!: Tree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        tree = factory.getTree();
    });

    it('should remove thyShowHeader when value is true', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <thy-table thyShowHeader="true"></thy-table>
                <thy-table thyShowHeader></thy-table>
                <thy-table [thyShowHeader]="true"></thy-table>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyShowHeader');
        expect(content).not.toContain('thyHeadless');
    });

    it('should migrate thyShowHeader false to thyHeadless', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <thy-table thyShowHeader="false"></thy-table>
                <thy-table [thyShowHeader]="false"></thy-table>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyShowHeader');
        expect(content).toContain('<thy-table thyHeadless></thy-table>');
    });

    it('should migrate bound thyShowHeader to thyHeadless with negated expression', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(templatePath, `<thy-table [thyShowHeader]="isShowHeader"></thy-table>`);

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyShowHeader');
        expect(content).toContain('[thyHeadless]="!(isShowHeader)"');
    });

    it('should migrate inline templates', async () => {
        const componentPath = '/projects/update-22-test/src/app/inline.component.ts';
        tree.create(
            componentPath,
            `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'app-inline',
                    template: \`<thy-table [thyShowHeader]="showHeader"></thy-table>\`
                })
                export class InlineComponent {}
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(componentPath);

        expect(content).not.toContain('thyShowHeader');
        expect(content).toContain('[thyHeadless]="!(showHeader)"');
    });

    it('should not change unrelated elements', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(templatePath, `<div thyShowHeader="false"></div>`);

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).toContain('thyShowHeader="false"');
        expect(content).not.toContain('thyHeadless');
    });

    function migrate(sourceTree: Tree): Promise<UnitTestTree> {
        return schematicRunner.runSchematic('migration-v22', undefined, sourceTree);
    }
});
