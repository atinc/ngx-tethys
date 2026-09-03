import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v22 header icon prefix migration', () => {
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    let tree!: Tree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        tree = factory.getTree();
    });

    it('should remove thyIconPrefix from thy-header', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(
            templatePath,
            `
                <thy-header thyTitle="Header" thyIconPrefix="wtf" thyIcon="house-square-fill"></thy-header>
                <thy-header thyTitle="Header" [thyIconPrefix]="iconPrefix"></thy-header>
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).not.toContain('thyIconPrefix');
        expect(content).toContain('thyIcon="house-square-fill"');
    });

    it('should not change unrelated elements', async () => {
        const templatePath = '/projects/update-22-test/src/app/app.html';
        tree.overwrite(templatePath, `<div thyIconPrefix="wtf"></div>`);

        const result = await migrate(tree);
        const content = result.readContent(templatePath);

        expect(content).toContain('thyIconPrefix="wtf"');
    });

    function migrate(sourceTree: Tree): Promise<UnitTestTree> {
        return schematicRunner.runSchematic('migration-v22', undefined, sourceTree);
    }
});
