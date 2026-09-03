import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v22 nav inside closable migration', () => {
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    let tree!: Tree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        tree = factory.getTree();
    });

    it('should remove thyInsideClosable when value is true', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <thy-nav thyInsideClosable="true"></thy-nav>
                <thy-nav thyInsideClosable></thy-nav>
                <thy-nav [thyInsideClosable]="true"></thy-nav>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyInsideClosable');
        expect(content).not.toContain('thyPopoverOptions');
    });

    it('should migrate thyInsideClosable false to thyPopoverOptions', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <thy-nav thyInsideClosable="false"></thy-nav>
                <thy-nav [thyInsideClosable]="false"></thy-nav>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyInsideClosable');
        expect(content).toContain('[thyPopoverOptions]="{ insideClosable: false }"');
    });

    it('should migrate bound thyInsideClosable to thyPopoverOptions', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(templatePath, `<thy-nav [thyInsideClosable]="insideClosable"></thy-nav>`);

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyInsideClosable');
        expect(content).toContain('[thyPopoverOptions]="{ insideClosable: insideClosable }"');
    });

    it('should remove thyInsideClosable when thyPopoverOptions already exists', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(templatePath, `<thy-nav [thyInsideClosable]="insideClosable" [thyPopoverOptions]="popoverOptions"></thy-nav>`);

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        // 注意：migration 不会把 insideClosable: false 合并进 popoverOptions，只会删掉 thyInsideClosable。需要用户自己手动合并
        expect(content).not.toContain('thyInsideClosable');
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
                    template: \`<thy-nav [thyInsideClosable]="insideClosable"></thy-nav>\`
                })
                export class InlineComponent {}
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(componentPath);

        expect(content).not.toContain('thyInsideClosable');
        expect(content).toContain('[thyPopoverOptions]="{ insideClosable: insideClosable }"');
    });

    it('should not change unrelated elements', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(templatePath, `<div thyInsideClosable="false"></div>`);

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).toContain('thyInsideClosable="false"');
        expect(content).not.toContain('thyPopoverOptions');
    });

    function migrate(sourceTree: Tree): Promise<UnitTestTree> {
        return schematicRunner.runSchematic('migration-v22', undefined, sourceTree);
    }
});
