import { migrateButtonGroupAppearance } from './button-group-appearance-migration';

describe('migrateButtonGroupAppearance', () => {
    it('should migrate outline-default to thyAppearance="outline"', () => {
        const content = `<thy-button-group thyType="outline-default"><button thyButton>A</button></thy-button-group>`;
        expect(migrateButtonGroupAppearance(content)).toBe(
            `<thy-button-group thyAppearance="outline"><button thyButton>A</button></thy-button-group>`
        );
    });

    it('should migrate outline-primary to outline and ensure child primary', () => {
        const content = `<thy-button-group thyType="outline-primary"><button thyButton>A</button><button thyButton>B</button></thy-button-group>`;
        expect(migrateButtonGroupAppearance(content)).toBe(
            `<thy-button-group thyAppearance="outline"><button thyButton="primary">A</button><button thyButton="primary">B</button></thy-button-group>`
        );
    });

    it('should migrate primary to fill and ensure child primary', () => {
        const content = `<thy-button-group thyType="primary"><button thyButton>Left</button><button thyButton>Right</button></thy-button-group>`;
        expect(migrateButtonGroupAppearance(content)).toBe(
            `<thy-button-group thyAppearance="fill"><button thyButton="primary">Left</button><button thyButton="primary">Right</button></thy-button-group>`
        );
    });

    it('should migrate bound literal thyType', () => {
        const content = `<thy-button-group [thyType]="'outline-default'"><button thyButton>A</button></thy-button-group>`;
        expect(migrateButtonGroupAppearance(content)).toBe(
            `<thy-button-group [thyAppearance]="'outline'"><button thyButton>A</button></thy-button-group>`
        );
    });

    it('should keep existing thyAppearance and only remove thyType', () => {
        const content = `<thy-button-group thyType="outline-default" thyAppearance="fill"><button thyButton>A</button></thy-button-group>`;
        expect(migrateButtonGroupAppearance(content)).toBe(
            `<thy-button-group thyAppearance="fill"><button thyButton>A</button></thy-button-group>`
        );
    });

    it('should not override child buttons that already have non-default color', () => {
        const content = `<thy-button-group thyType="primary"><button thyButton="danger">A</button></thy-button-group>`;
        expect(migrateButtonGroupAppearance(content)).toBe(
            `<thy-button-group thyAppearance="fill"><button thyButton="danger">A</button></thy-button-group>`
        );
    });

    it('should upgrade default child color to primary when group was primary', () => {
        const content = `<thy-button-group thyType="primary"><button thyButton="default">A</button></thy-button-group>`;
        expect(migrateButtonGroupAppearance(content)).toBe(
            `<thy-button-group thyAppearance="fill"><button thyButton="primary">A</button></thy-button-group>`
        );
    });

    it('should add thyButton="primary" when child has no color attribute', () => {
        const content = `<thy-button-group thyType="primary"><button>A</button></thy-button-group>`;
        expect(migrateButtonGroupAppearance(content)).toBe(
            `<thy-button-group thyAppearance="fill"><button thyButton="primary">A</button></thy-button-group>`
        );
    });

    it('should add thyButton="primary" for thy-button children without color', () => {
        const content = `<thy-button-group thyType="outline-primary"><thy-button>A</thy-button></thy-button-group>`;
        expect(migrateButtonGroupAppearance(content)).toBe(
            `<thy-button-group thyAppearance="outline"><thy-button thyButton="primary">A</thy-button></thy-button-group>`
        );
    });

    it('should not migrate dynamic thyType binding', () => {
        const content = `<thy-button-group [thyType]="type"><button thyButton>A</button></thy-button-group>`;
        expect(migrateButtonGroupAppearance(content)).toBe(content);
    });

    it('should not migrate unrelated elements', () => {
        const content = `<thy-button thyType="outline-default">Ok</thy-button>`;
        expect(migrateButtonGroupAppearance(content)).toBe(content);
    });

    it('should stay idempotent when migration runs multiple times', () => {
        const content = `<thy-button-group thyType="primary"><button thyButton>A</button></thy-button-group>`;
        const once = migrateButtonGroupAppearance(content);
        const twice = migrateButtonGroupAppearance(once);

        expect(once).toBe(`<thy-button-group thyAppearance="fill"><button thyButton="primary">A</button></thy-button-group>`);
        expect(twice).toBe(once);
    });
});
