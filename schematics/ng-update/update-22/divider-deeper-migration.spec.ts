import { migrateDividerDeeper } from './divider-deeper-migration';

describe('migrateDividerDeeper', () => {
    const thyDeeperTruthyCases: Array<{ label: string; input: string; expected: string }> = [
        {
            label: 'thyDeeper="true"',
            input: `<thy-divider thyDeeper="true" [thyStyle]="'solid'"></thy-divider>`,
            expected: `<thy-divider thyColor="light" [thyStyle]="'solid'"></thy-divider>`
        },
        {
            label: 'bare thyDeeper',
            input: `<thy-divider thyDeeper [thyVertical]="true"></thy-divider>`,
            expected: `<thy-divider thyColor="light" [thyVertical]="true"></thy-divider>`
        },
        {
            label: '[thyDeeper]="true"',
            input: `<thy-divider [thyDeeper]="true"></thy-divider>`,
            expected: `<thy-divider thyColor="light"></thy-divider>`
        },
        {
            label: `[thyDeeper]="'true'"`,
            input: `<thy-divider [thyDeeper]="'true'"></thy-divider>`,
            expected: `<thy-divider thyColor="light"></thy-divider>`
        }
    ];

    thyDeeperTruthyCases.forEach(({ label, input, expected }) => {
        it(`should migrate ${label} to thyColor="light"`, () => {
            expect(migrateDividerDeeper(input)).toBe(expected);
        });
    });

    it('should remove thyDeeper="false"', () => {
        const content = `<thy-divider thyDeeper="false" [thyStyle]="'solid'"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(`<thy-divider [thyStyle]="'solid'"></thy-divider>`);
    });

    it('should migrate bound thyDeeper to thyColor ternary', () => {
        const content = `<thy-divider [thyDeeper]="isDeeper"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(`<thy-divider [thyColor]="isDeeper ? 'light' : 'default'"></thy-divider>`);
    });

    const existingThyColorCases: Array<{ label: string; input: string; expected: string }> = [
        {
            label: 'text thyColor',
            input: `<thy-divider thyDeeper="true" thyColor="primary"></thy-divider>`,
            expected: `<thy-divider thyColor="primary"></thy-divider>`
        },
        {
            label: 'bound thyColor',
            input: `<thy-divider [thyDeeper]="isDeeper" [thyColor]="color"></thy-divider>`,
            expected: `<thy-divider [thyColor]="color"></thy-divider>`
        }
    ];

    existingThyColorCases.forEach(({ label, input, expected }) => {
        it(`should remove thyDeeper when existing ${label} is present`, () => {
            expect(migrateDividerDeeper(input)).toBe(expected);
        });
    });

    const thyColorDeeperCases: Array<{ label: string; input: string; expected: string }> = [
        {
            label: 'text attribute',
            input: `<thy-divider thyColor="deeper" [thyStyle]="'solid'"></thy-divider>`,
            expected: `<thy-divider thyColor="light" [thyStyle]="'solid'"></thy-divider>`
        },
        {
            label: 'bound literal',
            input: `<thy-divider [thyColor]="'deeper'"></thy-divider>`,
            expected: `<thy-divider [thyColor]="'light'"></thy-divider>`
        }
    ];

    thyColorDeeperCases.forEach(({ label, input, expected }) => {
        it(`should migrate thyColor deeper via ${label}`, () => {
            expect(migrateDividerDeeper(input)).toBe(expected);
        });
    });

    it('should migrate deeper color before stripping thyDeeper on the same tag', () => {
        const content = `<thy-divider thyColor="deeper" thyDeeper="true"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(`<thy-divider thyColor="light"></thy-divider>`);
    });

    it('should not change unrelated dynamic thyColor binding', () => {
        const content = `<thy-divider [thyColor]="color"></thy-divider>`;
        expect(migrateDividerDeeper(content)).toBe(content);
    });
});
