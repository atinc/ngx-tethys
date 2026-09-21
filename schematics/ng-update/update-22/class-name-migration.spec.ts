import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v22 class name migration', () => {
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    let tree!: Tree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        tree = factory.getTree();
    });

    it('should rename InputGroupSize to ThyInputGroupSize', async () => {
        const filePath = '/projects/update-22-test/src/app/input-group-size.ts';
        tree.create(
            filePath,
            `
                import { InputGroupSize } from 'ngx-tethys/input';

                export const inputGroupSize: InputGroupSize = 'md';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyInputGroupSize } from 'ngx-tethys/input'");
        expect(content).toContain("export const inputGroupSize: ThyInputGroupSize = 'md'");
        expect(content).not.toMatch(/\bInputGroupSize\b/);
    });

    it('should rename ButtonGroupSize to ThyButtonSize', async () => {
        const filePath = '/projects/update-22-test/src/app/button-size.ts';
        tree.create(
            filePath,
            `
                import { ButtonGroupSize } from 'ngx-tethys/button';

                export const buttonSize: ButtonGroupSize = 'md';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyButtonSize } from 'ngx-tethys/button'");
        expect(content).toContain("export const buttonSize: ThyButtonSize = 'md'");
        expect(content).not.toContain('ButtonGroupSize');
    });

    it('should rename ThyProgressShapeType to ThyProgressShape', async () => {
        const filePath = '/projects/update-22-test/src/app/progress-shape.ts';
        tree.create(
            filePath,
            `
                import { ThyProgressShapeType } from 'ngx-tethys/progress';

                export const progressShape: ThyProgressShapeType = 'circle';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyProgressShape } from 'ngx-tethys/progress'");
        expect(content).toContain("export const progressShape: ThyProgressShape = 'circle'");
        expect(content).not.toContain('ThyProgressShapeType');
    });

    it('should rename ThyStackedValue to ThyProgressStackedValue', async () => {
        const filePath = '/projects/update-22-test/src/app/progress-stacked-value.ts';
        tree.create(
            filePath,
            `
                import { ThyStackedValue } from 'ngx-tethys/progress';

                export const stackedValues: ThyStackedValue[] = [{ value: 20 }];
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyProgressStackedValue } from 'ngx-tethys/progress'");
        expect(content).toContain('export const stackedValues: ThyProgressStackedValue[] = [{ value: 20 }]');
        expect(content).not.toContain('ThyStackedValue');
    });

    it('should rename ThyDropdownMenuItemType to ThyDropdownMenuItemColor', async () => {
        const filePath = '/projects/update-22-test/src/app/dropdown-menu-item-color.ts';
        tree.create(
            filePath,
            `
                import { ThyDropdownMenuItemType } from 'ngx-tethys/dropdown';

                export const color: ThyDropdownMenuItemType = 'danger';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyDropdownMenuItemColor } from 'ngx-tethys/dropdown'");
        expect(content).toContain("export const color: ThyDropdownMenuItemColor = 'danger'");
        expect(content).not.toContain('ThyDropdownMenuItemType');
    });

    it('should rename timeline thyColor type to ThyTimelineColor', async () => {
        const filePath = '/projects/update-22-test/src/app/timeline-color.ts';
        tree.create(
            filePath,
            `
                import { thyColor } from 'ngx-tethys/timeline';

                export const color: thyColor = 'success';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyTimelineColor } from 'ngx-tethys/timeline'");
        expect(content).toContain("export const color: ThyTimelineColor = 'success'");
        expect(content).not.toMatch(/\bthyColor\b/);
    });

    it('should not rename thyColor input on thy-timeline-item', async () => {
        const filePath = '/projects/update-22-test/src/app/timeline-item-color.ts';
        tree.create(
            filePath,
            `
                import { Component } from '@angular/core';
                import { ThyTimelineItem } from 'ngx-tethys/timeline';

                @Component({
                    selector: 'app-timeline-item-color',
                    template: '<thy-timeline-item thyColor="success"></thy-timeline-item>',
                    imports: [ThyTimelineItem]
                })
                export class TimelineItemColorComponent {}
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain('thyColor="success"');
        expect(content).not.toContain('ThyTimelineColor="success"');
    });

    it('should rename ThyTimeMode to ThyTimelineMode', async () => {
        const filePath = '/projects/update-22-test/src/app/timeline-mode.ts';
        tree.create(
            filePath,
            `
                import { ThyTimeMode } from 'ngx-tethys/timeline';

                export const mode: ThyTimeMode = 'left';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyTimelineMode } from 'ngx-tethys/timeline'");
        expect(content).toContain("export const mode: ThyTimelineMode = 'left'");
        expect(content).not.toMatch(/\bThyTimeMode\b/);
    });

    it('should rename ThyStatisticColorType to ThyStatisticColor', async () => {
        const filePath = '/projects/update-22-test/src/app/statistic-color.ts';
        tree.create(
            filePath,
            `
                import { ThyStatisticColorType } from 'ngx-tethys/statistic';

                export const color: ThyStatisticColorType = 'success';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyStatisticColor } from 'ngx-tethys/statistic'");
        expect(content).toContain("export const color: ThyStatisticColor = 'success'");
        expect(content).not.toContain('ThyStatisticColorType');
    });

    it('should rename ThyStatisticSizes to ThyStatisticSize', async () => {
        const filePath = '/projects/update-22-test/src/app/statistic-size.ts';
        tree.create(
            filePath,
            `
                import { ThyStatisticSizes } from 'ngx-tethys/statistic';

                export const size: ThyStatisticSizes = 'default';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyStatisticSize } from 'ngx-tethys/statistic'");
        expect(content).toContain("export const size: ThyStatisticSize = 'default'");
        expect(content).not.toContain('ThyStatisticSizes');
    });

    it('should rename ThyStatisticShape to ThyStatisticAppearance', async () => {
        const filePath = '/projects/update-22-test/src/app/statistic-appearance.ts';
        tree.create(
            filePath,
            `
                import { ThyStatisticShape } from 'ngx-tethys/statistic';

                export const appearance: ThyStatisticShape = 'card';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyStatisticAppearance } from 'ngx-tethys/statistic'");
        expect(content).toContain("export const appearance: ThyStatisticAppearance = 'card'");
        expect(content).not.toContain('ThyStatisticShape');
    });

    it('should rename ThyProgressType to ThyProgressColor', async () => {
        const filePath = '/projects/update-22-test/src/app/progress-color.ts';
        tree.create(
            filePath,
            `
                import { ThyProgressType } from 'ngx-tethys/progress';

                export const color: ThyProgressType = 'success';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyProgressColor } from 'ngx-tethys/progress'");
        expect(content).toContain("export const color: ThyProgressColor = 'success'");
        expect(content).not.toContain('ThyProgressType');
    });

    it('should rename CompatibleDate to ThyCompatibleDate', async () => {
        const filePath = '/projects/update-22-test/src/app/compatible-date.ts';
        tree.create(
            filePath,
            `
                import { CompatibleDate } from 'ngx-tethys/date-picker';

                export const dateValue: CompatibleDate = new Date();
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyCompatibleDate } from 'ngx-tethys/date-picker'");
        expect(content).toContain('export const dateValue: ThyCompatibleDate = new Date()');
        expect(content).not.toMatch(/\bCompatibleDate\b/);
    });

    it('should not rename local identifiers that are not imported from ngx-tethys', async () => {
        const filePath = '/projects/update-22-test/src/app/local-size.ts';
        tree.create(
            filePath,
            `
                type ButtonGroupSize = 'sm' | 'lg';
                type ThyInputSize = 'md';
                type SelectControlSize = 'md';

                export const buttonSize: ButtonGroupSize = 'sm';
                export const inputSize: ThyInputSize = 'md';
                export const selectSize: SelectControlSize = 'md';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("type ButtonGroupSize = 'sm' | 'lg'");
        expect(content).toContain("type ThyInputSize = 'md'");
        expect(content).toContain("type SelectControlSize = 'md'");
    });

    it('should not rename InputSize imported from a non-ngx-tethys module', async () => {
        const filePath = '/projects/update-22-test/src/app/external-size.ts';
        tree.create(
            filePath,
            `
                import { InputSize } from '@other/input';

                export const inputSize: InputSize = 'sm';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { InputSize } from '@other/input'");
        expect(content).toContain('export const inputSize: InputSize = \'sm\'');
        expect(content).not.toContain('ThyFormControlSize');
    });

    function migrate(sourceTree: Tree): Promise<UnitTestTree> {
        return schematicRunner.runSchematic('migration-v22', undefined, sourceTree);
    }
});
