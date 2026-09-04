import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../testing';

describe('migrate-22 Schematic', () => {
    let tree!: UnitTestTree;
    const schematicRunner = new SchematicTestRunner('ngx-tethys', require.resolve('../collection.json'));

    let workspaceTree!: UnitTestTree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'migrate-22-test' });

        tree = factory.getTree();
    });

    it('should run v22 migration without updating package.json dependencies', async () => {
        const originalPackageJson = tree.readContent('package.json');

        workspaceTree = await schematicRunner.runSchematic('migrate-22', undefined, tree);

        expect(workspaceTree.readContent('package.json')).toBe(originalPackageJson);
    });

    it('should migrate type to thyType for thy-input', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'migrate-22-test' });
        const testTree = factory.addNewFile(
            '/projects/migrate-22-test/src/app/input-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyInputModule } from 'ngx-tethys/input';

@Component({
    selector: 'app-input-demo',
    template: \`
        <thy-input type="password" thyPlaceholder="Password"></thy-input>
    \`,
    imports: [ThyInputModule]
})
export class InputDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migrate-22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/migrate-22-test/src/app/input-demo.component.ts');
        expect(content).toContain('thyType="password"');
        expect(content).not.toContain('type="password"');
    });
});
