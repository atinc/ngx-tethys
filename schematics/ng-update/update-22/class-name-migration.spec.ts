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

    it('should rename ThyInputSize to ThyFormControlSize', async () => {
        const filePath = '/projects/update-22-test/src/app/input-size.ts';
        tree.create(
            filePath,
            `
                import { ThyInputSize } from 'ngx-tethys/input';

                export const inputSize: ThyInputSize = 'lg';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain('ThyFormControlSize');
        expect(content).not.toContain('ThyInputSize');
    });

    it('should rename TimePickerSize to ThyFormControlSize', async () => {
        const filePath = '/projects/update-22-test/src/app/time-size.ts';
        tree.create(
            filePath,
            `
                import { TimePickerSize } from 'ngx-tethys/time-picker';

                export const timeSize: TimePickerSize = 'lg';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain('ThyFormControlSize');
        expect(content).not.toContain('TimePickerSize');
    });

    it('should rename SelectControlSize to ThyFormControlSize', async () => {
        const filePath = '/projects/update-22-test/src/app/select-size.ts';
        tree.create(
            filePath,
            `
                import { SelectControlSize } from 'ngx-tethys/shared';

                export const selectSize: SelectControlSize = 'lg';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain('ThyFormControlSize');
        expect(content).not.toContain('SelectControlSize');
    });

    it('should rename InputSize to ThyFormControlSize', async () => {
        const filePath = '/projects/update-22-test/src/app/legacy-input-size.ts';
        tree.create(
            filePath,
            `
                import { InputSize } from 'ngx-tethys/input';

                export const inputSize: InputSize = 'sm';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain('ThyFormControlSize');
        expect(content).not.toContain('InputSize');
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

    function migrate(sourceTree: Tree): Promise<UnitTestTree> {
        return schematicRunner.runSchematic('migration-v22', undefined, sourceTree);
    }
});
