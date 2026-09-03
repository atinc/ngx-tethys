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

    it('should migrate type to thyType for thy-input', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/input-demo.component.ts',
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

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/input-demo.component.ts');
        expect(content).toContain('thyType="password"');
        expect(content).not.toMatch(/\stype="/);
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

    it('should migrate thyContext to thyContent for thy-badge', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/badge-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyBadgeModule } from 'ngx-tethys/badge';

@Component({
    selector: 'app-badge-demo',
    template: \`
        <thy-badge [thyContext]="'new'" thySize="sm"></thy-badge>
    \`,
    imports: [ThyBadgeModule]
})
export class BadgeDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/badge-demo.component.ts');
        expect(content).toContain(`[thyContent]="'new'"`);
        expect(content).not.toContain('thyContext');
    });

    it('should migrate thyContext to thyContent for thyBadge', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/badge-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyBadgeModule } from 'ngx-tethys/badge';

@Component({
    selector: 'app-badge-demo',
    template: \`
        <span thyBadge [thyContext]="content"></span>
    \`,
    imports: [ThyBadgeModule]
})
export class BadgeDemoComponent {
    content = 'new';
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/badge-demo.component.ts');
        expect(content).toContain('[thyContent]="content"');
        expect(content).not.toContain('thyContext');
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

    it('should migrate thyNavLinkActive to thyNavItemActive for thyNavLink', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/nav-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyNavModule } from 'ngx-tethys/nav';

@Component({
    selector: 'app-nav-demo',
    template: \`
        <a thyNavLink thyNavLinkActive="true">Link</a>
    \`,
    imports: [ThyNavModule]
})
export class NavDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/nav-demo.component.ts');
        expect(content).toContain('thyNavItemActive="true"');
        expect(content).not.toContain('thyNavLinkActive');
        expect(content).toContain('thyNavItem');
        expect(content).not.toContain('thyNavLink');
    });

    it('should migrate thyNavLinkActive to thyNavItemActive for thyNavItem', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/nav-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyNavModule } from 'ngx-tethys/nav';

@Component({
    selector: 'app-nav-demo',
    template: \`
        <a thyNavItem thyNavLinkActive="true">Link</a>
    \`,
    imports: [ThyNavModule]
})
export class NavDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/nav-demo.component.ts');
        expect(content).toContain('thyNavItemActive="true"');
        expect(content).not.toContain('thyNavLinkActive');
    });

    it('should migrate thyNavLink to thyNavItem', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/nav-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyNavModule } from 'ngx-tethys/nav';

@Component({
    selector: 'app-nav-demo',
    template: \`
        <a thyNavLink>Link</a>
    \`,
    imports: [ThyNavModule]
})
export class NavDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/nav-demo.component.ts');
        expect(content).toContain('thyNavItem');
        expect(content).not.toContain('thyNavLink');
    });

    it('should migrate thy-link to thy-anchor-link', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/anchor-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyAnchorModule } from 'ngx-tethys/anchor';

@Component({
    selector: 'app-anchor-demo',
    template: \`
        <thy-link thyHref="#basic" thyTitle="Basic"></thy-link>
    \`,
    imports: [ThyAnchorModule]
})
export class AnchorDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/anchor-demo.component.ts');
        expect(content).toContain('<thy-anchor-link thyHref="#basic" thyTitle="Basic"></thy-anchor-link>');
        expect(content).not.toContain('<thy-link');
    });

    it('should migrate thyLink exportAs to thyAnchorLink', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/anchor-link-ref-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyAnchorModule } from 'ngx-tethys/anchor';

@Component({
    selector: 'app-anchor-link-ref-demo',
    template: \`
        <thy-anchor-link #link="thyLink" thyHref="#basic" thyTitle="Basic"></thy-anchor-link>
    \`,
    imports: [ThyAnchorModule]
})
export class AnchorLinkRefDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/anchor-link-ref-demo.component.ts');
        expect(content).toContain('#link="thyAnchorLink"');
        expect(content).not.toContain('#link="thyLink"');
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

    it('should migrate ThyActiveTabInfo to ThyActiveTabValue', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/tabs-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyActiveTabInfo, ThyTabs } from 'ngx-tethys/tabs';

@Component({
    selector: 'app-tabs-demo',
    template: \`
        <thy-tabs [(thyActiveTab)]="activeTab"></thy-tabs>
    \`,
    imports: [ThyTabs]
})
export class TabsDemoComponent {
    activeTab: ThyActiveTabInfo = 0;
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/tabs-demo.component.ts');
        expect(content).toContain('ThyActiveTabValue');
        expect(content).not.toContain('ThyActiveTabInfo');
    });

    it('should migrate placeholder to thyPlaceholder for thy-input', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/input-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyInputModule } from 'ngx-tethys/input';

@Component({
    selector: 'app-input-demo',
    template: \`
        <thy-input placeholder="Please type"></thy-input>
    \`,
    imports: [ThyInputModule]
})
export class InputDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/input-demo.component.ts');
        expect(content).toContain('thyPlaceholder="Please type"');
        expect(content).not.toMatch(/\splaceholder="/);
    });

    it('should migrate placeholder to thyPlaceholder for thy-input binding', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/input-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyInputModule } from 'ngx-tethys/input';

@Component({
    selector: 'app-input-demo',
    template: \`
        <thy-input [placeholder]="inputPlaceholder"></thy-input>
    \`,
    imports: [ThyInputModule]
})
export class InputDemoComponent {
    inputPlaceholder = 'Please type';
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/input-demo.component.ts');
        expect(content).toContain('[thyPlaceholder]="inputPlaceholder"');
        expect(content).not.toContain('[placeholder]');
    });

    it('should not migrate placeholder for native input', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/input-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyInputModule } from 'ngx-tethys/input';

@Component({
    selector: 'app-input-demo',
    template: \`
        <input thyInput placeholder="Please type" />
    \`,
    imports: [ThyInputModule]
})
export class InputDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/input-demo.component.ts');
        expect(content).toContain('placeholder="Please type"');
        expect(content).not.toContain('thyPlaceholder');
    });

    it('should migrate placeholder to thyPlaceholder for thy-input-search', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/input-search-placeholder-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyInputModule } from 'ngx-tethys/input';

@Component({
    selector: 'app-input-search-placeholder-demo',
    template: \`
        <thy-input-search placeholder="Search"></thy-input-search>
    \`,
    imports: [ThyInputModule]
})
export class InputSearchPlaceholderDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/input-search-placeholder-demo.component.ts');
        expect(content).toContain('thyPlaceholder="Search"');
        expect(content).not.toMatch(/\splaceholder="/);
    });

    it('should migrate thyPlaceHolder to thyPlaceholder for thy-select', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/select-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThySelectModule } from 'ngx-tethys/select';

@Component({
    selector: 'app-select-demo',
    template: \`
        <thy-select thyPlaceHolder="请选择"></thy-select>
    \`,
    imports: [ThySelectModule]
})
export class SelectDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/select-demo.component.ts');
        expect(content).toContain('thyPlaceholder="请选择"');
        expect(content).not.toContain('thyPlaceHolder');
    });

    it('should migrate thyPlaceHolder to thyPlaceholder for thy-date-picker', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/date-picker-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';

@Component({
    selector: 'app-date-picker-demo',
    template: \`
        <thy-date-picker thyPlaceHolder="选择日期"></thy-date-picker>
    \`,
    imports: [ThyDatePickerModule]
})
export class DatePickerDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/date-picker-demo.component.ts');
        expect(content).toContain('thyPlaceholder="选择日期"');
        expect(content).not.toContain('thyPlaceHolder');
    });

    it('should migrate thyAutocompleteComponent to thyAutocomplete', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/autocomplete-demo.component.ts',
            `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyAutocompleteModule } from 'ngx-tethys/autocomplete';
import { ThyOptionModule } from 'ngx-tethys/shared';

@Component({
    selector: 'app-autocomplete-demo',
    template: \`
        <input thyInput thyAutocompleteTrigger [thyAutocompleteComponent]="auto" />
        <input thyInput [thyAutocomplete]="auto" />
        <thy-autocomplete #auto></thy-autocomplete>
    \`,
    imports: [FormsModule, ThyInputModule, ThyAutocompleteModule, ThyOptionModule]
})
export class AutocompleteDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/autocomplete-demo.component.ts');
        expect(content).toContain('[thyAutocomplete]="auto"');
        expect(content).not.toContain('thyAutocompleteComponent');
    });

    it('should migrate clear to thyClear for thy-input-search', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/input-search-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyInputModule } from 'ngx-tethys/input';

@Component({
    selector: 'app-input-search-demo',
    template: \`
        <thy-input-search (clear)="onClear($event)"></thy-input-search>
    \`,
    imports: [ThyInputModule]
})
export class InputSearchDemoComponent {
    onClear(event: Event) {}
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/input-search-demo.component.ts');
        expect(content).toContain('(thyClear)="onClear($event)"');
        expect(content).not.toContain('(clear)');
    });

    it('should migrate ThyDialogSizes.supperLg to ThyDialogSizes.superLg', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        factory.addNewFile(
            '/projects/update-22-test/src/ngx-tethys-dialog.d.ts',
            `
declare module 'ngx-tethys/dialog' {
    export class ThyDialog {
        open(component: unknown, config?: { size?: ThyDialogSizes }): void;
    }

    export enum ThyDialogSizes {
        supperLg = 'supper-lg',
        superLg = 'super-lg'
    }
}
`
        );
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/dialog-demo.component.ts',
            `
import { Component, inject } from '@angular/core';
import { ThyDialog, ThyDialogSizes } from 'ngx-tethys/dialog';

@Component({
    selector: 'app-dialog-demo',
    template: \`\`
})
export class DialogDemoComponent {
    private thyDialog = inject(ThyDialog);

    openDialog() {
        this.thyDialog.open(DialogContentComponent, {
            size: ThyDialogSizes.supperLg
        });
    }
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/dialog-demo.component.ts');
        expect(content).toContain('ThyDialogSizes.superLg');
        expect(content).not.toContain('supperLg');
    });

    it('should migrate thyDeeper to thyColor light for thy-divider', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/divider-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyDividerModule } from 'ngx-tethys/divider';

@Component({
    selector: 'app-divider-demo',
    template: \`
        <thy-divider thyDeeper="true" [thyStyle]="'solid'"></thy-divider>
    \`,
    imports: [ThyDividerModule]
})
export class DividerDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/divider-demo.component.ts');
        expect(content).toContain('thyColor="light"');
        expect(content).not.toContain('thyDeeper');
    });

    it('should migrate bound thyDeeper to thyColor for thy-divider', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/divider-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyDividerModule } from 'ngx-tethys/divider';

@Component({
    selector: 'app-divider-demo',
    template: \`
        <thy-divider [thyDeeper]="isDeeper"></thy-divider>
    \`,
    imports: [ThyDividerModule]
})
export class DividerDemoComponent {
    isDeeper = true;
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/divider-demo.component.ts');
        expect(content).toContain(`[thyColor]="isDeeper ? 'light' : 'default'"`);
        expect(content).not.toContain('thyDeeper');
    });

    it('should remove thyDeeper when thyColor already exists on thy-divider', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/divider-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyDividerModule } from 'ngx-tethys/divider';

@Component({
    selector: 'app-divider-demo',
    template: \`
        <thy-divider thyDeeper="true" thyColor="primary"></thy-divider>
    \`,
    imports: [ThyDividerModule]
})
export class DividerDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/divider-demo.component.ts');
        expect(content).toContain('thyColor="primary"');
        expect(content).not.toContain('thyDeeper');
    });

    it('should migrate ThyPropertyItem.setKeepEditing to setEditing', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        factory.addNewFile(
            '/projects/update-22-test/src/ngx-tethys-property.d.ts',
            `
declare module 'ngx-tethys/property' {
    export class ThyPropertyItem {
        setEditing(editing: boolean): void;
        /** @deprecated */
        setKeepEditing(keep: boolean): void;
    }
}
`
        );
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/property-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyPropertyItem } from 'ngx-tethys/property';

@Component({
    selector: 'app-property-demo',
    template: \`<thy-property-item></thy-property-item>\`
})
export class PropertyDemoComponent {
    private propertyItem!: ThyPropertyItem;

    startEditing() {
        this.propertyItem.setKeepEditing(true);
    }

    stopEditing() {
        this.propertyItem.setKeepEditing(false);
    }
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/property-demo.component.ts');
        expect(content).toContain('.setEditing(true)');
        expect(content).toContain('.setEditing(false)');
        expect(content).not.toContain('setKeepEditing');
    });

    it('should migrate ThyAvatarService.avatarSrcTransform to srcTransform', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        factory.addNewFile(
            '/projects/update-22-test/src/ngx-tethys-avatar.d.ts',
            `
declare module 'ngx-tethys/avatar' {
    export class ThyAvatarService {
        srcTransform(src: string, size: number): string;
        /** @deprecated */
        avatarSrcTransform(src: string, size: number): string;
    }
}
`
        );
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/avatar-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyAvatarService } from 'ngx-tethys/avatar';

@Component({
    selector: 'app-avatar-demo',
    template: \`<thy-avatar thySrc="avatar.png"></thy-avatar>\`
})
export class AvatarDemoComponent {
    private thyAvatarService!: ThyAvatarService;

    getAvatarSrc(src: string, size: number) {
        return this.thyAvatarService.avatarSrcTransform(src, size);
    }
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/avatar-demo.component.ts');
        expect(content).toContain('.srcTransform(src, size)');
        expect(content).not.toContain('avatarSrcTransform');
    });
});
