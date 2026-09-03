import { migrateDividerDeeper } from './divider-deeper-migration';

describe('migrateDividerDeeper', () => {
    it('should migrate thyDeeper="true" to thyColor="light"', () => {
        const content = `<thy-divider thyDeeper="true" [thyStyle]="'solid'"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(`<thy-divider thyColor="light" [thyStyle]="'solid'"></thy-divider>`);
    });

    it('should migrate bare thyDeeper to thyColor="light"', () => {
        const content = `<thy-divider thyDeeper [thyVertical]="true"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(`<thy-divider thyColor="light" [thyVertical]="true"></thy-divider>`);
    });

    it('should remove thyDeeper="false"', () => {
        const content = `<thy-divider thyDeeper="false" [thyStyle]="'solid'"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(`<thy-divider [thyStyle]="'solid'"></thy-divider>`);
    });

    it('should migrate [thyDeeper]="true" to thyColor="light"', () => {
        const content = `<thy-divider [thyDeeper]="true"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(`<thy-divider thyColor="light"></thy-divider>`);
    });

    it('should migrate [thyDeeper]="\'true\'" to thyColor="light"', () => {
        const content = `<thy-divider [thyDeeper]="'true'"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(`<thy-divider thyColor="light"></thy-divider>`);
    });

    it('should migrate bound thyDeeper to thyColor ternary', () => {
        const content = `<thy-divider [thyDeeper]="isDeeper"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(`<thy-divider [thyColor]="isDeeper ? 'light' : 'default'"></thy-divider>`);
    });

    it('should remove thyDeeper when thyColor already exists', () => {
        const content = `<thy-divider thyDeeper="true" thyColor="primary"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(`<thy-divider thyColor="primary"></thy-divider>`);
    });

    it('should remove bound thyDeeper when thyColor already exists', () => {
        const content = `<thy-divider [thyDeeper]="isDeeper" [thyColor]="color"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(`<thy-divider [thyColor]="color"></thy-divider>`);
    });

    it('should not change unrelated content', () => {
        const content = `<thy-divider [thyColor]="color"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(content);
    });
});
