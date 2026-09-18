import { migrateProgressBarColor } from './progress-bar-color-migration';

describe('migrateProgressBarColor', () => {
    it('should rename thyType to thyColor when thyColor is absent', () => {
        const content = `<thy-progress-bar thyType="info" [thyValue]="20"></thy-progress-bar>`;
        expect(migrateProgressBarColor(content)).toBe(`<thy-progress-bar thyColor="info" [thyValue]="20"></thy-progress-bar>`);
    });

    it('should rename bound thyType to thyColor when thyColor is absent', () => {
        const content = `<thy-progress-bar [thyType]="type" [thyValue]="20"></thy-progress-bar>`;
        expect(migrateProgressBarColor(content)).toBe(`<thy-progress-bar [thyColor]="type" [thyValue]="20"></thy-progress-bar>`);
    });

    it('should remove thyType when thyColor already exists', () => {
        const content = `<thy-progress-bar [thyType]="item.type" [thyColor]="item.color" [thyValue]="item.value"></thy-progress-bar>`;
        expect(migrateProgressBarColor(content)).toBe(
            `<thy-progress-bar [thyColor]="item.color" [thyValue]="item.value"></thy-progress-bar>`
        );
    });

    it('should keep existing thyColor when there is no thyType', () => {
        const content = `<thy-progress-bar thyColor="#ccc" [thyValue]="20"></thy-progress-bar>`;
        expect(migrateProgressBarColor(content)).toBe(content);
    });

    it('should not migrate thyType on other progress elements', () => {
        const content = `<thy-progress thyType="success" [thyValue]="20"></thy-progress>`;
        expect(migrateProgressBarColor(content)).toBe(content);
    });
});
