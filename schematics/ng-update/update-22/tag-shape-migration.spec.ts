import { migrateTagShape } from './tag-shape-migration';

describe('migrateTagShape', () => {
    it('should migrate thyShape pill on thy-tag element', () => {
        const content = `<thy-tag thyShape="pill">Tag</thy-tag>`;
        expect(migrateTagShape(content)).toBe(`<thy-tag thyShape="ellipse">Tag</thy-tag>`);
    });

    it('should migrate thyShape pill on thyTag directive host', () => {
        const content = `<span thyTag thyShape="pill">Tag</span>`;
        expect(migrateTagShape(content)).toBe(`<span thyTag thyShape="ellipse">Tag</span>`);
    });

    it('should migrate bound thyShape pill on thy-tag element', () => {
        const content = `<thy-tag [thyShape]="'pill'">Tag</thy-tag>`;
        expect(migrateTagShape(content)).toBe(`<thy-tag [thyShape]="'ellipse'">Tag</thy-tag>`);
    });

    it('should migrate bound thyShape pill on thyTag directive host', () => {
        const content = `<span thyTag="primary" [thyShape]="'pill'">Tag</span>`;
        expect(migrateTagShape(content)).toBe(`<span thyTag="primary" [thyShape]="'ellipse'">Tag</span>`);
    });

    it('should keep rectangle and ellipse shapes unchanged', () => {
        const content = `<thy-tag thyShape="rectangle">Tag</thy-tag><thy-tag thyShape="ellipse">Tag</thy-tag>`;
        expect(migrateTagShape(content)).toBe(content);
    });

    it('should not migrate thyShape pill on unrelated elements', () => {
        const content = `<div thyShape="pill">Not a tag</div>`;
        expect(migrateTagShape(content)).toBe(content);
    });

    it('should not migrate thyShape pill inside html comments', () => {
        const content = `<!-- <thy-tag thyShape="pill">Tag</thy-tag> -->`;
        expect(migrateTagShape(content)).toBe(content);
    });

    it('should not migrate dynamic shape binding', () => {
        const content = `<thy-tag [thyShape]="shape">Tag</thy-tag>`;
        expect(migrateTagShape(content)).toBe(content);
    });

    it('should be idempotent', () => {
        const content = `<thy-tag thyShape="pill">Tag</thy-tag>`;
        const once = migrateTagShape(content);
        expect(migrateTagShape(once)).toBe(once);
        expect(once).toBe(`<thy-tag thyShape="ellipse">Tag</thy-tag>`);
    });
});
