import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v22 tree select icon type migration', () => {
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    let tree!: Tree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        tree = factory.getTree();
    });

    it('should remove thyIconType from thy-tree-select', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <thy-tree-select thyIconType="default"></thy-tree-select>
                <thy-tree-select thyIconType="especial"></thy-tree-select>
                <thy-tree-select [thyIconType]="iconType"></thy-tree-select>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyIconType');
    });

    it('should not remove thyIconType from thy-icon', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(templatePath, `<thy-icon thyIconName="bell" thyIconType="fill"></thy-icon>`);

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).toContain('thyIconType="fill"');
    });

    it('should migrate inline templates', async () => {
        const componentPath = '/projects/update-22-test/src/app/inline.component.ts';
        tree.create(
            componentPath,
            `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'app-inline',
                    template: \`<thy-tree-select [thyIconType]="iconType"></thy-tree-select>\`
                })
                export class InlineComponent {}
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(componentPath);

        expect(content).not.toContain('thyIconType');
    });

    function migrate(sourceTree: Tree): Promise<UnitTestTree> {
        return schematicRunner.runSchematic('migration-v22', undefined, sourceTree);
    }
});
