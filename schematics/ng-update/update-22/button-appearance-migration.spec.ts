import { migrateButtonAppearance } from './button-appearance-migration';

describe('migrateButtonAppearance', () => {
    it('should migrate outline-* to thyAppearance="outline"', () => {
        const content = `<button thyButton="outline-primary">Primary</button>`;
        expect(migrateButtonAppearance(content)).toBe(
            `<button thyButton="primary" thyAppearance="outline">Primary</button>`
        );
    });

    it('should migrate link-secondary to link + default', () => {
        const content = `<button thyButton="link-secondary" class="cancel">Cancel</button>`;
        expect(migrateButtonAppearance(content)).toBe(
            `<button thyButton="default" thyAppearance="link" class="cancel">Cancel</button>`
        );
    });

    it('should migrate thyType compound values', () => {
        const content = `<thy-button thyType="outline-default">Default</thy-button>`;
        expect(migrateButtonAppearance(content)).toBe(
            `<thy-button thyType="default" thyAppearance="outline">Default</thy-button>`
        );
    });

    it('should migrate bound literal compound values', () => {
        const content = `<button [thyButton]="'outline-danger'">Danger</button>`;
        expect(migrateButtonAppearance(content)).toBe(
            `<button [thyButton]="'danger'" thyAppearance="outline">Danger</button>`
        );
    });

    it('should migrate secondary to primary fill', () => {
        const content = `<button thyButton="secondary">Go</button>`;
        expect(migrateButtonAppearance(content)).toBe(`<button thyButton="primary">Go</button>`);
    });

    it('should migrate bare link to link + primary', () => {
        const content = `<button thyButton="link">Link</button>`;
        expect(migrateButtonAppearance(content)).toBe(
            `<button thyButton="primary" thyAppearance="link">Link</button>`
        );
    });

    it('should not duplicate thyAppearance when already set', () => {
        const content = `<button thyButton="outline-primary" thyAppearance="outline">Primary</button>`;
        expect(migrateButtonAppearance(content)).toBe(
            `<button thyButton="primary" thyAppearance="outline">Primary</button>`
        );
    });

    it('should migrate link-danger-weak to CSS utility class', () => {
        const content = `<button thyButton="link-danger-weak">Remove</button>`;
        expect(migrateButtonAppearance(content)).toBe(`<button class="link-danger-weak">Remove</button>`);
    });

    it('should append link-danger-weak when class already exists', () => {
        const content = `<button thyButton="link-danger-weak" class="mr-2">Remove</button>`;
        expect(migrateButtonAppearance(content)).toBe(`<button class="mr-2 link-danger-weak">Remove</button>`);
    });

    it('should not change ThyButtonGroup outline types', () => {
        const content = `<thy-button-group thyType="outline-default"><button>A</button></thy-button-group>`;
        expect(migrateButtonAppearance(content)).toBe(content);
    });

    it('should not change modern color types', () => {
        const content = `<button thyButton="primary" thyAppearance="link">Ok</button>`;
        expect(migrateButtonAppearance(content)).toBe(content);
    });
});
