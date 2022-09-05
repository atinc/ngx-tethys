import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v14 Schematic', () => {
    let tree: Tree;
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));

    let workspaceTree: UnitTestTree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-14-test' });

        tree = factory.getTree();
    });

    it('should update to ng v14', async () => {
        workspaceTree = await schematicRunner.runSchematicAsync('migration-v14', undefined, tree).toPromise();
        const file = workspaceTree.get('package.json');
        expect(file.content.toString()).toBeTruthy();
    });
});
