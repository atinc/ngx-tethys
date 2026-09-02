import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v22 Schematic', () => {
    let tree!: Tree;
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));

    let workspaceTree!: UnitTestTree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });

        tree = factory.getTree();
    });

    it('should update to ng v22', async () => {
        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, tree);
        const file = workspaceTree.get('package.json');
        expect(file.content.toString()).toBeTruthy();
        const packageJSON = JSON.parse(file.content.toString());
        expect(packageJSON['dependencies']['@angular/core']).toContain('^22.');
    });

    it('should migrate thyTheme to thyAppearance for thyAction', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/action-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyActionModule } from 'ngx-tethys/action';

@Component({
    selector: 'app-action-demo',
    template: \`
        <a thyAction thyTheme="lite" thyIcon="inbox"></a>
    \`,
    imports: [ThyActionModule]
})
export class ActionDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/action-demo.component.ts');
        expect(content).toContain('thyAppearance="lite"');
        expect(content).not.toContain('thyTheme');
    });

    it('should migrate thyTheme to thyAppearance for thy-action element', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/action-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyActionModule } from 'ngx-tethys/action';

@Component({
    selector: 'app-action-demo',
    template: \`
        <thy-action thyTheme="lite" thyIcon="inbox"></thy-action>
    \`,
    imports: [ThyActionModule]
})
export class ActionDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/action-demo.component.ts');
        expect(content).toContain('thyAppearance="lite"');
        expect(content).not.toContain('thyTheme');
    });

    it('should migrate thyTheme to thyAppearance for thyTag', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/tag-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyTagModule } from 'ngx-tethys/tag';

@Component({
    selector: 'app-tag-demo',
    template: \`
        <span thyTag thyTheme="outline">Tag</span>
    \`,
    imports: [ThyTagModule]
})
export class TagDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/tag-demo.component.ts');
        expect(content).toContain('thyAppearance="outline"');
        expect(content).not.toContain('thyTheme');
    });

    it('should migrate thyTheme to thyAppearance for thy-tag element', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/tag-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyTagModule } from 'ngx-tethys/tag';

@Component({
    selector: 'app-tag-demo',
    template: \`
        <thy-tag thyTheme="outline">Tag</thy-tag>
    \`,
    imports: [ThyTagModule]
})
export class TagDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/tag-demo.component.ts');
        expect(content).toContain('thyAppearance="outline"');
        expect(content).not.toContain('thyTheme');
    });

    it('should migrate thyTheme weak-fill to thyAppearance subtle for thyTag', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/tag-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyTagModule } from 'ngx-tethys/tag';

@Component({
    selector: 'app-tag-demo',
    template: \`
        <span thyTag thyTheme="weak-fill">Tag</span>
    \`,
    imports: [ThyTagModule]
})
export class TagDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/tag-demo.component.ts');
        expect(content).toContain('thyAppearance="subtle"');
        expect(content).not.toContain('weak-fill');
        expect(content).not.toContain('thyTheme');
    });

    it('should migrate thyAppearance weak-fill to subtle for thy-tag element', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/tag-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyTagModule } from 'ngx-tethys/tag';

@Component({
    selector: 'app-tag-demo',
    template: \`
        <thy-tag thyAppearance="weak-fill">Tag</thy-tag>
    \`,
    imports: [ThyTagModule]
})
export class TagDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/tag-demo.component.ts');
        expect(content).toContain('thyAppearance="subtle"');
        expect(content).not.toContain('weak-fill');
    });

    it('should migrate bound thyTheme weak-fill to thyAppearance subtle for thy-tag element', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/tag-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyTagModule } from 'ngx-tethys/tag';

@Component({
    selector: 'app-tag-demo',
    template: \`
        <thy-tag [thyTheme]="'weak-fill'">Tag</thy-tag>
    \`,
    imports: [ThyTagModule]
})
export class TagDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/tag-demo.component.ts');
        expect(content).toContain(`[thyAppearance]="'subtle'"`);
        expect(content).not.toContain('weak-fill');
        expect(content).not.toContain('thyTheme');
    });

    it('should migrate thyHasBorder to thyDivided for thyHeader', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/header-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyLayoutModule } from 'ngx-tethys/layout';

@Component({
    selector: 'app-header-demo',
    template: \`
        <div thyHeader thyHasBorder="true">Header</div>
    \`,
    imports: [ThyLayoutModule]
})
export class HeaderDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/header-demo.component.ts');
        expect(content).toContain('thyDivided="true"');
        expect(content).not.toContain('thyHasBorder');
    });

    it('should migrate thyHasBorder to thyDivided for thy-header element', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/header-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyLayoutModule } from 'ngx-tethys/layout';

@Component({
    selector: 'app-header-demo',
    template: \`
        <thy-header thyHasBorder="false" thyTitle="Header"></thy-header>
    \`,
    imports: [ThyLayoutModule]
})
export class HeaderDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/header-demo.component.ts');
        expect(content).toContain('thyDivided="false"');
        expect(content).not.toContain('thyHasBorder');
    });

    it('should migrate thyShowRemove to thyRemovable for thy-avatar', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/avatar-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyAvatarModule } from 'ngx-tethys/avatar';

@Component({
    selector: 'app-avatar-demo',
    template: \`
        <thy-avatar thyName="Peter" thyShowRemove="true"></thy-avatar>
    \`,
    imports: [ThyAvatarModule]
})
export class AvatarDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/avatar-demo.component.ts');
        expect(content).toContain('thyRemovable="true"');
        expect(content).not.toContain('thyShowRemove');
    });

    it('should migrate thyShowRemove to thyRemovable for thy-avatar binding', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/avatar-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyAvatarModule } from 'ngx-tethys/avatar';

@Component({
    selector: 'app-avatar-demo',
    template: \`
        <thy-avatar thyName="Peter" [thyShowRemove]="removable"></thy-avatar>
    \`,
    imports: [ThyAvatarModule]
})
export class AvatarDemoComponent {
    removable = true;
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/avatar-demo.component.ts');
        expect(content).toContain('[thyRemovable]="removable"');
        expect(content).not.toContain('thyShowRemove');
    });

    it('should migrate thyOnRemove to thyRemove for thy-avatar', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/avatar-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyAvatarModule } from 'ngx-tethys/avatar';

@Component({
    selector: 'app-avatar-demo',
    template: \`
        <thy-avatar thyName="Peter" thyRemovable="true" (thyOnRemove)="onRemove($event)"></thy-avatar>
    \`,
    imports: [ThyAvatarModule]
})
export class AvatarDemoComponent {
    onRemove(event: Event) {}
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/avatar-demo.component.ts');
        expect(content).toContain('(thyRemove)="onRemove($event)"');
        expect(content).not.toContain('thyOnRemove');
    });
});
