import { collectMenuThemeEdits, migrateMenuTheme } from './menu-theme-migration';

describe('migrateMenuTheme', () => {
    it('should migrate thyTheme="loose" to thyVariant="loose"', () => {
        const content = `<thy-menu thyTheme="loose"></thy-menu>`;
        expect(migrateMenuTheme(content)).toBe(`<thy-menu thyVariant="loose"></thy-menu>`);
    });

    it('should remove thyTheme="compact"', () => {
        const content = `<thy-menu thyTheme="compact"></thy-menu>`;
        expect(migrateMenuTheme(content)).toBe(`<thy-menu></thy-menu>`);
    });

    it('should keep thyTheme="dark" for new theme API', () => {
        const content = `<thy-menu thyTheme="dark"></thy-menu>`;
        expect(migrateMenuTheme(content)).toBe(`<thy-menu thyTheme="dark"></thy-menu>`);
    });

    it('should migrate bound legacy loose theme', () => {
        const content = `<thy-menu [thyTheme]="'loose'"></thy-menu>`;
        expect(migrateMenuTheme(content)).toBe(`<thy-menu [thyVariant]="'loose'"></thy-menu>`);
    });

    it('should not duplicate thyVariant when already set', () => {
        const content = `<thy-menu thyVariant="compact" thyTheme="loose"></thy-menu>`;
        expect(migrateMenuTheme(content)).toBe(`<thy-menu thyVariant="compact"></thy-menu>`);
    });

    it('should not migrate thyTheme on non-menu elements', () => {
        const content = `<thy-alert thyTheme="naked"></thy-alert>`;
        expect(migrateMenuTheme(content)).toBe(content);
    });

    it('should stay idempotent after migration', () => {
        const content = `<thy-menu thyTheme="loose" [thyCollapsed]="collapsed"></thy-menu>`;
        const once = migrateMenuTheme(content);
        const twice = migrateMenuTheme(once);

        expect(once).toBe(`<thy-menu thyVariant="loose" [thyCollapsed]="collapsed"></thy-menu>`);
        expect(twice).toBe(once);
    });
});

describe('collectMenuThemeEdits', () => {
    it('should collect edits for menu tags only', () => {
        const edits = collectMenuThemeEdits(`<thy-menu thyTheme="loose"></thy-menu>`);
        expect(edits.length).toBe(1);
    });
});
