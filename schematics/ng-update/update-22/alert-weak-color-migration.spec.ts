import { migrateAlertWeakColor } from './alert-weak-color-migration';

describe('alert weak color migration', () => {
    it('should migrate thyColor primary-weak to bordered + primary', () => {
        const content = `<thy-alert thyColor="primary-weak" thyMessage="msg"></thy-alert>`;
        expect(migrateAlertWeakColor(content)).toBe(
            `<thy-alert thyAppearance="bordered" thyColor="primary" thyMessage="msg"></thy-alert>`
        );
    });

    it('should migrate thyType success-weak to bordered + thyColor success', () => {
        const content = `<thy-alert thyType="success-weak" thyMessage="msg"></thy-alert>`;
        expect(migrateAlertWeakColor(content)).toBe(
            `<thy-alert thyAppearance="bordered" thyColor="success" thyMessage="msg"></thy-alert>`
        );
    });

    it('should migrate bound thyColor weak literal', () => {
        const content = `<thy-alert [thyColor]="'warning-weak'" thyMessage="msg"></thy-alert>`;
        expect(migrateAlertWeakColor(content)).toBe(
            `<thy-alert thyAppearance="bordered" [thyColor]="'warning'" thyMessage="msg"></thy-alert>`
        );
    });

    it('should replace existing thyAppearance when migrating weak color', () => {
        const content = `<thy-alert thyAppearance="fill" thyColor="danger-weak" thyMessage="msg"></thy-alert>`;
        expect(migrateAlertWeakColor(content)).toBe(
            `<thy-alert thyAppearance="bordered" thyColor="danger" thyMessage="msg"></thy-alert>`
        );
    });

    it('should not migrate unrelated elements', () => {
        const content = `<div thyColor="primary-weak"></div>`;
        expect(migrateAlertWeakColor(content)).toBe(content);
    });

    it('should not migrate dynamic thyColor binding', () => {
        const content = `<thy-alert [thyColor]="color" thyMessage="msg"></thy-alert>`;
        expect(migrateAlertWeakColor(content)).toBe(content);
    });
});
