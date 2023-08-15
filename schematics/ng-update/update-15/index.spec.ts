import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v15 Schematic', () => {
    let tree: Tree;
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));

    let workspaceTree: UnitTestTree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-15-test' });

        tree = factory.getTree();
    });

    it('should update to ng v15', async () => {
        workspaceTree = await schematicRunner.runSchematic('migration-v15', undefined, tree);
        const file = workspaceTree.get('package.json');
        expect(file.content.toString()).toBeTruthy();
    });
});
