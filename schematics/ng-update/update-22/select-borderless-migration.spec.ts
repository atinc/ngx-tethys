import { migrateSelectBorderless } from './select-borderless-migration';

describe('migrateSelectBorderless', () => {
    it('should migrate bare thyBorderless to thyAppearance ghost', () => {
        const content = `<thy-select thyBorderless></thy-select>`;
        expect(migrateSelectBorderless(content)).toBe(`<thy-select thyAppearance="ghost"></thy-select>`);
    });

    it('should migrate thyBorderless="true" to thyAppearance ghost', () => {
        const content = `<thy-select thyBorderless="true"></thy-select>`;
        expect(migrateSelectBorderless(content)).toBe(`<thy-select thyAppearance="ghost"></thy-select>`);
    });

    it('should migrate thy-custom-select thyBorderless to thyAppearance ghost', () => {
        const content = `<thy-custom-select thyBorderless="true"></thy-custom-select>`;
        expect(migrateSelectBorderless(content)).toBe(`<thy-custom-select thyAppearance="ghost"></thy-custom-select>`);
    });

    it('should migrate bound thyBorderless true to thyAppearance ghost', () => {
        const content = `<thy-select [thyBorderless]="true"></thy-select>`;
        expect(migrateSelectBorderless(content)).toBe(`<thy-select thyAppearance="ghost"></thy-select>`);
    });

    it('should remove thyBorderless="false"', () => {
        const content = `<thy-select thyBorderless="false"></thy-select>`;
        expect(migrateSelectBorderless(content)).toBe(`<thy-select></thy-select>`);
    });

    it('should remove bound thyBorderless false', () => {
        const content = `<thy-select [thyBorderless]="false"></thy-select>`;
        expect(migrateSelectBorderless(content)).toBe(`<thy-select></thy-select>`);
    });

    it('should drop thyBorderless when thyAppearance already exists', () => {
        expect(migrateSelectBorderless(`<thy-select thyAppearance="subtle" thyBorderless></thy-select>`)).toBe(
            `<thy-select thyAppearance="subtle"></thy-select>`
        );
        expect(migrateSelectBorderless(`<thy-select thyAppearance="ghost" [thyBorderless]="true"></thy-select>`)).toBe(
            `<thy-select thyAppearance="ghost"></thy-select>`
        );
    });

    it('should migrate thySelectControl thyBorderless', () => {
        const content = `<div thySelectControl thyBorderless></div>`;
        expect(migrateSelectBorderless(content)).toBe(`<div thySelectControl thyAppearance="ghost"></div>`);
    });

    it('should not migrate dynamic bindings', () => {
        const content = `<thy-select [thyBorderless]="borderless"></thy-select>`;
        expect(migrateSelectBorderless(content)).toBe(content);
    });

    it('should not migrate thyBorderless on unrelated elements', () => {
        const content = `<thy-input thyBorderless></thy-input>`;
        expect(migrateSelectBorderless(content)).toBe(content);
    });

    it('should not migrate thyBorderless inside html comments', () => {
        const content = `<!-- thyBorderless -->`;
        expect(migrateSelectBorderless(content)).toBe(content);
    });
});
