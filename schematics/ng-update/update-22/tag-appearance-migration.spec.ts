import { migrateTagWeakFill } from './tag-appearance-migration';

describe('migrateTagWeakFill', () => {
    it('should migrate thyTheme weak-fill on thy-tag element', () => {
        const content = `<thy-tag thyTheme="weak-fill">Tag</thy-tag>`;
        expect(migrateTagWeakFill(content)).toBe(`<thy-tag thyAppearance="subtle">Tag</thy-tag>`);
    });

    it('should migrate thyAppearance weak-fill on thy-tag element', () => {
        const content = `<thy-tag thyAppearance="weak-fill">Tag</thy-tag>`;
        expect(migrateTagWeakFill(content)).toBe(`<thy-tag thyAppearance="subtle">Tag</thy-tag>`);
    });

    it('should migrate thyTag directive weak-fill', () => {
        const content = `<span thyTag thyTheme="weak-fill">Tag</span>`;
        expect(migrateTagWeakFill(content)).toBe(`<span thyTag thyAppearance="subtle">Tag</span>`);
    });

    it('should migrate bound thyTheme weak-fill on thy-tag element', () => {
        const content = `<thy-tag [thyTheme]="'weak-fill'">Tag</thy-tag>`;
        expect(migrateTagWeakFill(content)).toBe(`<thy-tag [thyAppearance]="'subtle'">Tag</thy-tag>`);
    });

    it('should migrate bound thyAppearance weak-fill on thy-tag element', () => {
        const content = `<thy-tag [thyAppearance]="'weak-fill'">Tag</thy-tag>`;
        expect(migrateTagWeakFill(content)).toBe(`<thy-tag [thyAppearance]="'subtle'">Tag</thy-tag>`);
    });

    it('should not migrate weak-fill on unrelated elements', () => {
        const content = `<div thyTheme="weak-fill">Not a tag</div>`;
        expect(migrateTagWeakFill(content)).toBe(content);
    });

    it('should not migrate weak-fill inside html comments', () => {
        const content = `<!-- thyTheme="weak-fill" -->`;
        expect(migrateTagWeakFill(content)).toBe(content);
    });

    it('should not migrate dynamic theme binding', () => {
        const content = `<thy-tag [thyAppearance]="theme">Tag</thy-tag>`;
        expect(migrateTagWeakFill(content)).toBe(content);
    });
});
