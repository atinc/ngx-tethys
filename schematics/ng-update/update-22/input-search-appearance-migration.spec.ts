import { migrateInputSearchTransparent } from './input-search-appearance-migration';

describe('migrateInputSearchTransparent', () => {
    it('should migrate thyTheme transparent to thyAppearance ghost', () => {
        const content = `<thy-input-search thyTheme="transparent"></thy-input-search>`;
        expect(migrateInputSearchTransparent(content)).toBe(`<thy-input-search thyAppearance="ghost"></thy-input-search>`);
    });

    it('should migrate thyVariant transparent to thyAppearance ghost', () => {
        const content = `<thy-input-search thyVariant="transparent"></thy-input-search>`;
        expect(migrateInputSearchTransparent(content)).toBe(`<thy-input-search thyAppearance="ghost"></thy-input-search>`);
    });

    it('should migrate bound thyTheme transparent to thyAppearance ghost', () => {
        const content = `<thy-input-search [thyTheme]="'transparent'"></thy-input-search>`;
        expect(migrateInputSearchTransparent(content)).toBe(`<thy-input-search [thyAppearance]="'ghost'"></thy-input-search>`);
    });

    it('should migrate bound thyVariant transparent to thyAppearance ghost', () => {
        const content = `<thy-input-search [thyVariant]="'transparent'"></thy-input-search>`;
        expect(migrateInputSearchTransparent(content)).toBe(`<thy-input-search [thyAppearance]="'ghost'"></thy-input-search>`);
    });

    it('should keep ellipse thyTheme and thyVariant', () => {
        expect(migrateInputSearchTransparent(`<thy-input-search thyTheme="ellipse"></thy-input-search>`)).toBe(
            `<thy-input-search thyTheme="ellipse"></thy-input-search>`
        );
        expect(migrateInputSearchTransparent(`<thy-input-search thyVariant="ellipse"></thy-input-search>`)).toBe(
            `<thy-input-search thyVariant="ellipse"></thy-input-search>`
        );
    });

    it('should not migrate dynamic bindings', () => {
        const content = `<thy-input-search [thyTheme]="theme" [thyVariant]="variant"></thy-input-search>`;
        expect(migrateInputSearchTransparent(content)).toBe(content);
    });

    it('should not migrate transparent on unrelated elements', () => {
        const content = `<thy-collapse thyTheme="transparent"></thy-collapse>`;
        expect(migrateInputSearchTransparent(content)).toBe(content);
    });

    it('should not migrate transparent inside html comments', () => {
        const content = `<!-- thyTheme="transparent" thyVariant="transparent" -->`;
        expect(migrateInputSearchTransparent(content)).toBe(content);
    });

    it('should drop transparent when thyAppearance already exists', () => {
        expect(migrateInputSearchTransparent(`<thy-input-search thyAppearance="subtle" thyTheme="transparent"></thy-input-search>`)).toBe(
            `<thy-input-search thyAppearance="subtle"></thy-input-search>`
        );
        expect(migrateInputSearchTransparent(`<thy-input-search thyAppearance="ghost" thyVariant="transparent"></thy-input-search>`)).toBe(
            `<thy-input-search thyAppearance="ghost"></thy-input-search>`
        );
    });
});
