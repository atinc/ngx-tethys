import { isAlertAppearanceTarget, migrateAlertAppearance } from './alert-appearance-migration';

describe('migrateAlertAppearance', () => {
    it('should detect thy-alert targets', () => {
        expect(isAlertAppearanceTarget('<thy-alert thyColor="success-weak"></thy-alert>')).toBe(true);
        expect(isAlertAppearanceTarget('<thy-button thyColor="success-weak"></thy-button>')).toBe(false);
    });

    it('should migrate thyColor weak values to thyColor + thyAppearance bordered', () => {
        const content = `<thy-alert thyColor="primary-weak" thyMessage="msg"></thy-alert>`;
        expect(migrateAlertAppearance(content)).toBe(
            `<thy-alert thyColor="primary" thyAppearance="bordered" thyMessage="msg"></thy-alert>`
        );
    });

    it('should migrate thyType weak values', () => {
        const content = `<thy-alert thyType="danger-weak"></thy-alert>`;
        expect(migrateAlertAppearance(content)).toBe(`<thy-alert thyColor="danger" thyAppearance="bordered"></thy-alert>`);
    });

    it('should migrate bound literal weak values', () => {
        const content = `<thy-alert [thyColor]="'warning-weak'" thyCloseable="true"></thy-alert>`;
        expect(migrateAlertAppearance(content)).toBe(
            `<thy-alert [thyColor]="'warning'" thyAppearance="bordered" thyCloseable="true"></thy-alert>`
        );
    });

    it('should not duplicate thyAppearance when already present', () => {
        const content = `<thy-alert thyColor="success-weak" thyAppearance="bordered"></thy-alert>`;
        expect(migrateAlertAppearance(content)).toBe(`<thy-alert thyColor="success" thyAppearance="bordered"></thy-alert>`);
    });

    it('should leave non-weak thyColor unchanged', () => {
        const content = `<thy-alert thyColor="success"></thy-alert>`;
        expect(migrateAlertAppearance(content)).toBe(content);
    });

    it('should leave dynamic binding unchanged', () => {
        const content = `<thy-alert [thyColor]="alertType"></thy-alert>`;
        expect(migrateAlertAppearance(content)).toBe(content);
    });

    it('should be idempotent', () => {
        const content = `<thy-alert thyColor="primary-weak"></thy-alert>`;
        const once = migrateAlertAppearance(content);
        const twice = migrateAlertAppearance(once);
        expect(twice).toBe(once);
        expect(twice).toBe(`<thy-alert thyColor="primary" thyAppearance="bordered"></thy-alert>`);
    });
});
