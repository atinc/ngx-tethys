import { migrateInputSearchAppearance } from './input-search-appearance-migration';

describe('migrateInputSearchAppearance', () => {
    it('should migrate thyTheme transparent to thyAppearance ghost', () => {
        const content = `<thy-input-search thyTheme="transparent"></thy-input-search>`;
        expect(migrateInputSearchAppearance(content)).toBe(`<thy-input-search thyAppearance="ghost"></thy-input-search>`);
    });

    it('should migrate bound thyTheme transparent to thyAppearance ghost', () => {
        const content = `<thy-input-search [thyTheme]="'transparent'"></thy-input-search>`;
        expect(migrateInputSearchAppearance(content)).toBe(`<thy-input-search [thyAppearance]="'ghost'"></thy-input-search>`);
    });

    it('should migrate thyTheme ellipse to thyShape ellipse and thyAppearance fill', () => {
        expect(migrateInputSearchAppearance(`<thy-input-search thyTheme="ellipse"></thy-input-search>`)).toBe(
            `<thy-input-search thyShape="ellipse" thyAppearance="fill"></thy-input-search>`
        );
    });

    it('should migrate bound ellipse to thyShape and thyAppearance', () => {
        expect(migrateInputSearchAppearance(`<thy-input-search [thyTheme]="'ellipse'"></thy-input-search>`)).toBe(
            `<thy-input-search [thyShape]="'ellipse'" [thyAppearance]="'fill'"></thy-input-search>`
        );
    });

    it('should only add thyShape when thyAppearance already exists for ellipse', () => {
        expect(migrateInputSearchAppearance(`<thy-input-search thyAppearance="outline" thyTheme="ellipse"></thy-input-search>`)).toBe(
            `<thy-input-search thyAppearance="outline" thyShape="ellipse"></thy-input-search>`
        );
    });

    it('should remove default thyTheme', () => {
        expect(migrateInputSearchAppearance(`<thy-input-search thyTheme="default"></thy-input-search>`)).toBe(
            `<thy-input-search></thy-input-search>`
        );
    });

    it('should not migrate thyVariant (intermediate API, no compatibility migration)', () => {
        const content = `<thy-input-search thyVariant="ellipse"></thy-input-search><thy-input-search thyVariant="transparent"></thy-input-search>`;
        expect(migrateInputSearchAppearance(content)).toBe(content);
    });

    it('should not migrate dynamic bindings', () => {
        const content = `<thy-input-search [thyTheme]="theme"></thy-input-search>`;
        expect(migrateInputSearchAppearance(content)).toBe(content);
    });

    it('should not migrate transparent on unrelated elements', () => {
        const content = `<thy-collapse thyTheme="transparent"></thy-collapse>`;
        expect(migrateInputSearchAppearance(content)).toBe(content);
    });

    it('should not migrate transparent inside html comments', () => {
        const content = `<!-- thyTheme="transparent" -->`;
        expect(migrateInputSearchAppearance(content)).toBe(content);
    });

    it('should drop transparent when thyAppearance already exists', () => {
        expect(migrateInputSearchAppearance(`<thy-input-search thyAppearance="subtle" thyTheme="transparent"></thy-input-search>`)).toBe(
            `<thy-input-search thyAppearance="subtle"></thy-input-search>`
        );
    });
});
