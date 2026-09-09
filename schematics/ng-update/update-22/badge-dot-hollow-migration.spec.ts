import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v22 badge dot hollow migration', () => {
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    let tree!: Tree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        tree = factory.getTree();
    });

    it('should remove thyIsDot from thy-badge', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <thy-badge thyIsDot="true" thySize="sm"></thy-badge>
                <thy-badge thyIsDot thyType="primary"></thy-badge>
                <thy-badge [thyIsDot]="true"></thy-badge>
                <thy-badge [thyIsDot]="isDot"></thy-badge>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyIsDot');
        expect(content).toContain('<thy-badge thySize="sm"></thy-badge>');
        expect(content).toContain('<thy-badge thyType="primary"></thy-badge>');
        expect(content).toContain('<thy-badge></thy-badge>');
    });

    it('should remove thyIsHollow from thy-badge', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <thy-badge thyIsHollow="true" thySize="sm"></thy-badge>
                <thy-badge thyIsHollow thyType="primary"></thy-badge>
                <thy-badge [thyIsHollow]="true"></thy-badge>
                <thy-badge [thyIsHollow]="isHollow"></thy-badge>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyIsHollow');
        expect(content).toContain('<thy-badge thySize="sm"></thy-badge>');
        expect(content).toContain('<thy-badge thyType="primary"></thy-badge>');
        expect(content).toContain('<thy-badge></thy-badge>');
    });

    it('should remove thyIsDot and thyIsHollow from thyBadge directive', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `<span thyBadge thyIsDot="true" thySize="sm"></span>`
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyIsDot');
        expect(content).toContain('<span thyBadge thySize="sm"></span>');
    });

    it('should migrate inline templates', async () => {
        const componentPath = '/projects/update-22-test/src/app/inline.component.ts';
        tree.create(
            componentPath,
            `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'app-inline',
                    template: \`<thy-badge thyIsDot="true" [thyIsHollow]="isHollow"></thy-badge>\`
                })
                export class InlineComponent {}
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(componentPath);

        expect(content).not.toContain('thyIsDot');
        expect(content).not.toContain('thyIsHollow');
        expect(content).toContain('<thy-badge></thy-badge>');
    });

    it('should not change unrelated elements', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(templatePath, `<div thyIsDot="true" thyIsHollow="true"></div>`);

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).toContain('thyIsDot="true"');
        expect(content).toContain('thyIsHollow="true"');
    });

    function migrate(sourceTree: Tree): Promise<UnitTestTree> {
        return schematicRunner.runSchematic('migration-v22', undefined, sourceTree);
    }
});
