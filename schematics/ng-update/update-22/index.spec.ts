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

    it('should migrate thyTheme to thyAppearance for thy-collapse', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/collapse-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyCollapseModule } from 'ngx-tethys/collapse';

@Component({
    selector: 'app-collapse-demo',
    template: \`
        <thy-collapse thyTheme="bordered">
            <thy-collapse-item thyTitle="Title">Content</thy-collapse-item>
        </thy-collapse>
    \`,
    imports: [ThyCollapseModule]
})
export class CollapseDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/collapse-demo.component.ts');
        expect(content).toContain('thyAppearance="bordered"');
        expect(content).not.toContain('thyTheme');
    });

    it('should migrate bound thyTheme to thyAppearance for thy-collapse', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/collapse-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyCollapseModule } from 'ngx-tethys/collapse';

@Component({
    selector: 'app-collapse-demo',
    template: \`
        <thy-collapse [thyTheme]="'ghost'">
            <thy-collapse-item thyTitle="Title">Content</thy-collapse-item>
        </thy-collapse>
    \`,
    imports: [ThyCollapseModule]
})
export class CollapseDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/collapse-demo.component.ts');
        expect(content).toContain(`[thyAppearance]="'ghost'"`);
        expect(content).not.toContain('thyTheme');
    });

    it('should migrate thyTheme to thyAppearance for thy-dot', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/dot-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyDotModule } from 'ngx-tethys/dot';

@Component({
    selector: 'app-dot-demo',
    template: \`
        <thy-dot thyTheme="outline"></thy-dot>
    \`,
    imports: [ThyDotModule]
})
export class DotDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/dot-demo.component.ts');
        expect(content).toContain('thyAppearance="outline"');
        expect(content).not.toContain('thyTheme');
    });

    it('should migrate thyTheme to thyAppearance for thyDot attribute', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/dot-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyDotModule } from 'ngx-tethys/dot';

@Component({
    selector: 'app-dot-demo',
    template: \`
        <span thyDot thyTheme="fill"></span>
    \`,
    imports: [ThyDotModule]
})
export class DotDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/dot-demo.component.ts');
        expect(content).toContain('thyAppearance="fill"');
        expect(content).not.toContain('thyTheme');
    });

    it('should migrate bound thyTheme to thyAppearance for thy-dot attribute', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/dot-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyDotModule } from 'ngx-tethys/dot';

@Component({
    selector: 'app-dot-demo',
    template: \`
        <span thy-dot [thyTheme]="'outline'"></span>
    \`,
    imports: [ThyDotModule]
})
export class DotDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/dot-demo.component.ts');
        expect(content).toContain(`[thyAppearance]="'outline'"`);
        expect(content).not.toContain('thyTheme');
    });

    it('should migrate thyType to thyColor for thy-button', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/button-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyButtonModule } from 'ngx-tethys/button';

@Component({
    selector: 'app-button-demo',
    template: \`
        <thy-button thyType="primary">Ok</thy-button>
        <thy-button [thyType]="type">Dynamic</thy-button>
        <thy-button thyType="default">Outline</thy-button>
    \`,
    imports: [ThyButtonModule]
})
export class ButtonDemoComponent {
    type = 'danger';
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/button-demo.component.ts');
        expect(content).toContain('thyColor="primary"');
        expect(content).toContain('[thyColor]="type"');
        expect(content).toContain('thyColor="default"');
        expect(content).not.toMatch(/<thy-button[^>]*thyType/);
    });

    it('should migrate thyType to thyAppearance for thy-button-group', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/button-group-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyButtonModule } from 'ngx-tethys/button';

@Component({
    selector: 'app-button-group-demo',
    template: \`
        <thy-button-group thyType="outline-default">
            <button thyButton>Left</button>
            <button thyButton>Right</button>
        </thy-button-group>
        <thy-button-group thyType="primary">
            <button thyButton>New</button>
            <button thyButton>More</button>
        </thy-button-group>
        <thy-button-group [thyType]="type">
            <button thyButton>Dynamic</button>
        </thy-button-group>
    \`,
    imports: [ThyButtonModule]
})
export class ButtonGroupDemoComponent {
    type = 'outline-default';
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/button-group-demo.component.ts');
        expect(content).toContain('thyAppearance="outline"');
        expect(content).toContain('thyAppearance="fill"');
        expect(content).toContain('thyButton="primary"');
        expect(content).toContain('[thyType]="type"');
        expect(content).not.toMatch(/thy-button-group[^>]*thyType="outline-default"/);
        expect(content).not.toMatch(/thy-button-group[^>]*thyType="primary"/);
    });

    it('should migrate thyTheme to thyAppearance and thyType to thyColor for thy-alert', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/alert-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyAlertModule } from 'ngx-tethys/alert';

@Component({
    selector: 'app-alert-demo',
    template: \`
        <thy-alert thyTheme="naked" thyType="success" thyMessage="message"></thy-alert>
    \`,
    imports: [ThyAlertModule]
})
export class AlertDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/alert-demo.component.ts');
        expect(content).toContain('thyAppearance="naked"');
        expect(content).toContain('thyColor="success"');
        expect(content).not.toContain('thyTheme');
        expect(content).not.toMatch(/<thy-alert[^>]*thyType/);
    });

    it('should migrate thyType to thyColor for thy-slider', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/slider-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThySliderModule } from 'ngx-tethys/slider';

@Component({
    selector: 'app-slider-demo',
    template: \`
        <thy-slider thyType="warning" [(ngModel)]="value"></thy-slider>
        <thy-slider [thyType]="typeValue"></thy-slider>
    \`,
    imports: [ThySliderModule]
})
export class SliderDemoComponent {
    value = 0;
    typeValue = 'success';
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/slider-demo.component.ts');
        expect(content).toContain('<thy-slider thyColor="warning" [(ngModel)]="value"></thy-slider>');
        expect(content).toContain('<thy-slider [thyColor]="typeValue"></thy-slider>');
        expect(content).not.toMatch(/thy-slider[^>]*thyType/);
    });

    it('should migrate thyType to thyColor for thy-switch', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/switch-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThySwitchModule } from 'ngx-tethys/switch';

@Component({
    selector: 'app-switch-demo',
    template: \`
        <thy-switch thyType="info"></thy-switch>
        <thy-switch [thyType]="type"></thy-switch>
        <thy-button thyType="primary">Ok</thy-button>
    \`,
    imports: [ThySwitchModule]
})
export class SwitchDemoComponent {
    type = 'danger';
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/switch-demo.component.ts');
        expect(content).toContain('thyColor="info"');
        expect(content).toContain('[thyColor]="type"');
        expect(content).toContain('thyColor="primary"');
        expect(content).not.toMatch(/<thy-switch[^>]*thyType/);
        expect(content).not.toMatch(/<thy-switch[^>]*\[thyType\]/);
    });

    it('should migrate thyType to thyColor for thy-badge and thyBadge', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/badge-color-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyBadgeModule } from 'ngx-tethys/badge';

@Component({
    selector: 'app-badge-color-demo',
    template: \`
        <thy-badge thyType="primary" [thyCount]="5"></thy-badge>
        <thy-badge [thyType]="type" [thyCount]="5"></thy-badge>
        <span thyBadge thyType="success" [thyCount]="5"></span>
    \`,
    imports: [ThyBadgeModule]
})
export class BadgeColorDemoComponent {
    type = 'danger';
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/badge-color-demo.component.ts');
        expect(content).toContain('thyColor="primary"');
        expect(content).toContain('[thyColor]="type"');
        expect(content).toContain('thyColor="success"');
        expect(content).not.toMatch(/<thy-badge[^>]*thyType/);
        expect(content).not.toMatch(/<thy-badge[^>]*\[thyType\]/);
        expect(content).not.toMatch(/thyBadge[^>]*thyType/);
    });

    it('should migrate thyType to thyColor for thy-progress and thy-progress-circle', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/progress-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyProgressModule } from 'ngx-tethys/progress';

@Component({
    selector: 'app-progress-demo',
    template: \`
        <thy-progress thyType="success" [thyValue]="20"></thy-progress>
        <thy-progress [thyType]="type" [thyValue]="20"></thy-progress>
        <thy-progress-circle thyType="warning" [thyValue]="20"></thy-progress-circle>
        <thy-progress-bar thyType="info" [thyValue]="20"></thy-progress-bar>
        <thy-button thyType="primary">Ok</thy-button>
    \`,
    imports: [ThyProgressModule]
})
export class ProgressDemoComponent {
    type = 'danger';
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/progress-demo.component.ts');
        expect(content).toContain('<thy-progress thyColor="success" [thyValue]="20"></thy-progress>');
        expect(content).toContain('<thy-progress [thyColor]="type" [thyValue]="20"></thy-progress>');
        expect(content).toContain('<thy-progress-circle thyColor="warning" [thyValue]="20"></thy-progress-circle>');
        expect(content).toContain('<thy-progress-bar thyColor="info" [thyValue]="20"></thy-progress-bar>');
        expect(content).toContain('thyColor="primary"');
        expect(content).not.toMatch(/<thy-progress(?!-)[^>]*\bthyType\b/);
        expect(content).not.toMatch(/<thy-progress(?!-)[^>]*\[thyType\]/);
        expect(content).not.toMatch(/<thy-progress-circle[^>]*thyType/);
        expect(content).not.toMatch(/<thy-progress-bar[^>]*thyType/);
    });

    it('should keep thyColor and remove thyType when both exist on thy-progress-bar', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/progress-bar-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyProgressStrip } from 'ngx-tethys/progress';

@Component({
    selector: 'app-progress-bar-demo',
    template: \`
        <thy-progress-bar [thyType]="item.type" [thyColor]="item.color" [thyValue]="item.value"></thy-progress-bar>
    \`,
    imports: [ThyProgressStrip]
})
export class ProgressBarDemoComponent {
    item = { type: 'success', color: '#ccc', value: 20 };
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/progress-bar-demo.component.ts');
        expect(content).toContain('<thy-progress-bar [thyColor]="item.color" [thyValue]="item.value"></thy-progress-bar>');
        expect(content).not.toMatch(/thy-progress-bar[^>]*thyType/);
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

    it('should remove thyIsDot and thyIsHollow from thy-badge', async () => {
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
        <thy-badge thyIsDot="true" thySize="sm"></thy-badge>
        <thy-badge thyIsHollow="true" thyColor="primary"></thy-badge>
        <span thyBadge thyIsDot="true"></span>
    \`,
    imports: [ThyBadgeModule]
})
export class BadgeDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/badge-demo.component.ts');
        expect(content).not.toContain('thyIsDot');
        expect(content).not.toContain('thyIsHollow');
        expect(content).toContain('<thy-badge thySize="sm"></thy-badge>');
        expect(content).toContain('<thy-badge thyColor="primary"></thy-badge>');
        expect(content).toContain('<span thyBadge></span>');
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

    it('should migrate ThyNavType to ThyNavVariant', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/nav-type-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyNav, ThyNavType } from 'ngx-tethys/nav';

@Component({
    selector: 'app-nav-type-demo',
    template: \`
        <thy-nav [thyVariant]="variant">
            <a thyNavItem>Link</a>
        </thy-nav>
    \`,
    imports: [ThyNav]
})
export class NavTypeDemoComponent {
    variant: ThyNavType = 'tabs';
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/nav-type-demo.component.ts');
        expect(content).toContain('ThyNavVariant');
        expect(content).not.toContain('ThyNavType');
    });

    it('should migrate thyType to thyVariant for thy-nav', async () => {
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
        <thy-nav thyType="pulled">
            <a thyNavItem>Link</a>
        </thy-nav>
        <thy-nav [thyType]="type">
            <a thyNavItem>Link</a>
        </thy-nav>
        <thy-tabs thyType="pills"></thy-tabs>
        <thy-button thyType="primary">Ok</thy-button>
    \`,
    imports: [ThyNavModule]
})
export class NavDemoComponent {
    type = 'tabs';
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/nav-demo.component.ts');
        expect(content).toContain('thyVariant="pulled"');
        expect(content).toContain('[thyVariant]="type"');
        expect(content).toContain('thyVariant="pills"');
        expect(content).toContain('thyColor="primary"');
        expect(content).not.toMatch(/<thy-nav[^>]*thyType/);
        expect(content).not.toMatch(/<thy-nav[^>]*\[thyType\]/);
        expect(content).not.toMatch(/<thy-tabs[^>]*thyType/);
    });

    it('should migrate thyType to thyVariant for thy-tabs', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/tabs-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyTabsModule } from 'ngx-tethys/tabs';

@Component({
    selector: 'app-tabs-demo',
    template: \`
        <thy-tabs thyType="pills">
            <thy-tab thyTitle="Tab1">Tab1</thy-tab>
        </thy-tabs>
        <thy-tabs [thyType]="variant">
            <thy-tab thyTitle="Tab2">Tab2</thy-tab>
        </thy-tabs>
        <thy-nav thyType="tabs">
            <a thyNavItem>Link</a>
        </thy-nav>
    \`,
    imports: [ThyTabsModule]
})
export class TabsDemoComponent {
    variant = 'lite';
}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/tabs-demo.component.ts');
        expect(content).toContain('thyVariant="pills"');
        expect(content).toContain('[thyVariant]="variant"');
        expect(content).toContain('thyVariant="tabs"');
        expect(content).not.toMatch(/<thy-tabs[^>]*thyType/);
        expect(content).not.toMatch(/<thy-tabs[^>]*\[thyType\]/);
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
        expect(content).toContain(`[thyAppearance]="'solid'"`);
        expect(content).not.toContain('thyDeeper');
        expect(content).not.toMatch(/thy-divider[^>]*thyStyle/);
    });

    it('should migrate thyStyle to thyAppearance for thy-divider', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/divider-style-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyDividerModule } from 'ngx-tethys/divider';

@Component({
    selector: 'app-divider-style-demo',
    template: \`
        <thy-divider thyStyle="dashed"></thy-divider>
        <thy-divider [thyStyle]="'solid'"></thy-divider>
    \`,
    imports: [ThyDividerModule]
})
export class DividerStyleDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/divider-style-demo.component.ts');
        expect(content).toContain('thyAppearance="dashed"');
        expect(content).toContain(`[thyAppearance]="'solid'"`);
        expect(content).not.toMatch(/thy-divider[^>]*thyStyle/);
    });

    it('should migrate thyColor default to lighter for thy-divider', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/divider-color-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyDividerModule } from 'ngx-tethys/divider';

@Component({
    selector: 'app-divider-color-demo',
    template: \`
        <thy-divider thyColor="default"></thy-divider>
        <thy-divider [thyColor]="'default'"></thy-divider>
    \`,
    imports: [ThyDividerModule]
})
export class DividerColorDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/divider-color-demo.component.ts');
        expect(content).toContain('thyColor="lighter"');
        expect(content).toContain(`[thyColor]="'lighter'"`);
        expect(content).not.toContain('thyColor="default"');
        expect(content).not.toContain(`[thyColor]="'default'"`);
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
        expect(content).toContain(`[thyColor]="isDeeper ? 'light' : 'lighter'"`);
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

    it('should migrate overlapping CDK and custom template rules in a single run', async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        factory.addNewFile(
            '/projects/update-22-test/src/app/combo-demo.component.html',
            `
<thy-select thyPlaceHolder="请选择"></thy-select>
<thy-tag thyTheme="weak-fill">Tag</thy-tag>
<button thyButton="outline-primary">Btn</button>
`
        );
        const testTree = factory.addNewFile(
            '/projects/update-22-test/src/app/combo-demo.component.ts',
            `
import { Component } from '@angular/core';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyTagModule } from 'ngx-tethys/tag';

@Component({
    selector: 'app-combo-demo',
    templateUrl: './combo-demo.component.html',
    imports: [ThySelectModule, ThyTagModule, ThyButtonModule]
})
export class ComboDemoComponent {}
`
        );

        workspaceTree = await schematicRunner.runSchematic('migration-v22', undefined, testTree);
        const content = workspaceTree.readContent('/projects/update-22-test/src/app/combo-demo.component.html');
        expect(content).toContain('thyPlaceholder="请选择"');
        expect(content).not.toContain('thyPlaceHolder');
        expect(content).toContain('thyAppearance="subtle"');
        expect(content).not.toContain('weak-fill');
        expect(content).not.toContain('thyTheme');
        expect(content).toContain('thyButton="primary"');
        expect(content).toContain('thyAppearance="outline"');
        expect(content).not.toContain('outline-primary');
    });
});
