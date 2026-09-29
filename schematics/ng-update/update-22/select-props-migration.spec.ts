import { migrateSelectProps } from './select-props-migration';

describe('migrateSelectProps', () => {
    it('should migrate thyMode="multiple" to thyMultiple', () => {
        expect(migrateSelectProps(`<thy-select thyMode="multiple"></thy-select>`)).toBe(`<thy-select thyMultiple></thy-select>`);
    });

    it('should remove thyMode when not multiple', () => {
        expect(migrateSelectProps(`<thy-select thyMode=""></thy-select>`)).toBe(`<thy-select></thy-select>`);
    });

    it('should migrate bound thyMode literal multiple', () => {
        expect(migrateSelectProps(`<thy-select [thyMode]="'multiple'"></thy-select>`)).toBe(`<thy-select thyMultiple></thy-select>`);
    });

    it('should migrate bound thyMode expression to thyMultiple comparison', () => {
        expect(migrateSelectProps(`<thy-select [thyMode]="mode"></thy-select>`)).toBe(
            `<thy-select [thyMultiple]="mode === 'multiple'"></thy-select>`
        );
    });

    it('should not migrate thyMode on thy-table', () => {
        const content = `<thy-table thyMode="tree"></thy-table>`;
        expect(migrateSelectProps(content)).toBe(content);
    });

    it('should migrate thyMode on thy-custom-select', () => {
        expect(migrateSelectProps(`<thy-custom-select thyMode="multiple"></thy-custom-select>`)).toBe(
            `<thy-custom-select thyMultiple></thy-custom-select>`
        );
    });

    it('should remove bound thyMode empty string literal', () => {
        expect(migrateSelectProps(`<thy-select [thyMode]="''"></thy-select>`)).toBe(`<thy-select></thy-select>`);
    });

    it('should migrate thyLoadState="false" to thyLoading', () => {
        expect(migrateSelectProps(`<thy-select thyLoadState="false"></thy-select>`)).toBe(`<thy-select thyLoading></thy-select>`);
    });

    it('should remove thyLoadState when loaded', () => {
        expect(migrateSelectProps(`<thy-select thyLoadState="true"></thy-select>`)).toBe(`<thy-select></thy-select>`);
    });

    it('should migrate bound thyLoadState literal false to thyLoading', () => {
        expect(migrateSelectProps(`<thy-select [thyLoadState]="false"></thy-select>`)).toBe(`<thy-select thyLoading></thy-select>`);
    });

    it('should migrate bound thyLoadState expression with negation', () => {
        expect(migrateSelectProps(`<thy-tree-select [thyLoadState]="loadState"></thy-tree-select>`)).toBe(
            `<thy-tree-select [thyLoading]="!(loadState)"></thy-tree-select>`
        );
    });

    it('should remove bound thyLoadState literal true', () => {
        expect(migrateSelectProps(`<thy-select [thyLoadState]="true"></thy-select>`)).toBe(`<thy-select></thy-select>`);
    });
});
