import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v22 form control size type migration', () => {
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    let tree!: Tree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-22-test' });
        tree = factory.getTree();
    });

    it('should rename ThyInputSize and move import to ngx-tethys/core', async () => {
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

        expect(content).toContain("import { ThyFormControlSize } from 'ngx-tethys/core'");
        expect(content).toContain("export const inputSize: ThyFormControlSize = 'lg'");
        expect(content).not.toContain('ThyInputSize');
        expect(content).not.toContain("from 'ngx-tethys/input'");
    });

    it('should rename TimePickerSize and move import to ngx-tethys/core', async () => {
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

        expect(content).toContain("import { ThyFormControlSize } from 'ngx-tethys/core'");
        expect(content).toContain("export const timeSize: ThyFormControlSize = 'lg'");
        expect(content).not.toContain('TimePickerSize');
    });

    it('should rename SelectControlSize and move import to ngx-tethys/core', async () => {
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

        expect(content).toContain("import { ThyFormControlSize } from 'ngx-tethys/core'");
        expect(content).toContain("export const selectSize: ThyFormControlSize = 'lg'");
        expect(content).not.toContain('SelectControlSize');
    });

    it('should rename InputSize and move import to ngx-tethys/core', async () => {
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

        expect(content).toContain("import { ThyFormControlSize } from 'ngx-tethys/core'");
        expect(content).toContain("export const inputSize: ThyFormControlSize = 'sm'");
        expect(content).not.toContain('InputSize');
    });

    it('should keep other imports and merge ThyFormControlSize into existing core import', async () => {
        const filePath = '/projects/update-22-test/src/app/mixed-imports.ts';
        tree.create(
            filePath,
            `
                import { ThyTranslate } from 'ngx-tethys/core';
                import { ThyInputCount, ThyInputDirective, ThyInputGroup, ThyInputSize } from 'ngx-tethys/input';
                import { SelectControlSize, ThyOption } from 'ngx-tethys/shared';

                export class MixedComponent {
                    inputSize: ThyInputSize = 'md';
                    selectSize: SelectControlSize = 'lg';
                }
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("import { ThyTranslate, ThyFormControlSize } from 'ngx-tethys/core'");
        expect(content).toContain("import { ThyInputCount, ThyInputDirective, ThyInputGroup } from 'ngx-tethys/input'");
        expect(content).toContain("import { ThyOption } from 'ngx-tethys/shared'");
        expect(content).toContain('inputSize: ThyFormControlSize =');
        expect(content).toContain('selectSize: ThyFormControlSize =');
        expect(content).not.toContain('ThyInputSize');
        expect(content).not.toContain('SelectControlSize');
    });

    it('should not rename local identifiers that are not imported from ngx-tethys', async () => {
        const filePath = '/projects/update-22-test/src/app/local-size.ts';
        tree.create(
            filePath,
            `
                type ThyInputSize = 'md';
                type SelectControlSize = 'md';

                export const inputSize: ThyInputSize = 'md';
                export const selectSize: SelectControlSize = 'md';
            `
        );

        const result = await migrate(tree);
        const content = result.readContent(filePath);

        expect(content).toContain("type ThyInputSize = 'md'");
        expect(content).toContain("type SelectControlSize = 'md'");
        expect(content).not.toContain("from 'ngx-tethys/core'");
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
