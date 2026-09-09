import { migrateCardDeprecatedProps } from './card-deprecated-props-migration';

describe('migrateCardDeprecatedProps', () => {
    it('should remove thyHasLeftRightPadding="false"', () => {
        const content = `<thy-card thyHasLeftRightPadding="false" thyDivided="true"></thy-card>`;
        const migrated = migrateCardDeprecatedProps(content);
        expect(migrated).toBe(`<thy-card thyDivided="true"></thy-card>`);
    });

    it('should remove thyHasLeftRightPadding="true"', () => {
        const content = `<thy-card thyHasLeftRightPadding="true" thyBordered="true"></thy-card>`;
        const migrated = migrateCardDeprecatedProps(content);
        expect(migrated).toBe(`<thy-card thyBordered="true"></thy-card>`);
    });

    it('should remove [thyHasLeftRightPadding]="false"', () => {
        const content = `<thy-card [thyHasLeftRightPadding]="false"></thy-card>`;
        expect(migrateCardDeprecatedProps(content)).toBe(`<thy-card></thy-card>`);
    });

    it('should remove bound thyHasLeftRightPadding', () => {
        const content = `<thy-card [thyHasLeftRightPadding]="hasPadding"></thy-card>`;
        expect(migrateCardDeprecatedProps(content)).toBe(`<thy-card></thy-card>`);
    });

    it('should remove thyHasLeftRightPadding and keep existing class', () => {
        const content = `<thy-card class="custom-card" thyHasLeftRightPadding="false"></thy-card>`;
        expect(migrateCardDeprecatedProps(content)).toBe(`<thy-card class="custom-card"></thy-card>`);
    });

    it('should move thySize from thy-card-header to thy-card', () => {
        const content = `
            <thy-card>
                <thy-card-header thyTitle="Title" thySize="sm"></thy-card-header>
                <thy-card-content>content</thy-card-content>
            </thy-card>
        `;
        const migrated = migrateCardDeprecatedProps(content);
        expect(migrated).toContain('<thy-card thySize="sm">');
        expect(migrated).toMatch(/<thy-card-header thyTitle="Title"\s*>/);
        expect(migrated).not.toMatch(/thy-card-header[^>]*thySize/);
    });

    it('should move bound thySize from thy-card-content to thy-card', () => {
        const content = `
            <thy-card>
                <thy-card-header thyTitle="Title"></thy-card-header>
                <thy-card-content [thySize]="size">content</thy-card-content>
            </thy-card>
        `;
        const migrated = migrateCardDeprecatedProps(content);
        expect(migrated).toContain('[thySize]="size"');
        expect(migrated).toMatch(/<thy-card[^>]*\[thySize\]="size"/);
        expect(migrated).not.toContain('thy-card-content [thySize]');
    });

    it('should remove child thySize when thy-card already has thySize', () => {
        const content = `
            <thy-card thySize="lg">
                <thy-card-header thyTitle="Title" thySize="sm"></thy-card-header>
                <thy-card-content thySize="sm">content</thy-card-content>
            </thy-card>
        `;
        const migrated = migrateCardDeprecatedProps(content);
        expect(migrated).toContain('<thy-card thySize="lg">');
        expect(migrated).not.toMatch(/thy-card-header[^>]*thySize/);
        expect(migrated).not.toMatch(/thy-card-content[^>]*thySize/);
    });

    it('should not change unrelated content', () => {
        const content = `<thy-card thySize="md"><thy-card-header thyTitle="Title"></thy-card-header></thy-card>`;
        expect(migrateCardDeprecatedProps(content)).toBe(content);
    });
});
