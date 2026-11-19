import { migrateLoadingDone } from './loading-done-migration';

describe('migrateLoadingDone', () => {
    it('should migrate thyDone to thyLoading false', () => {
        expect(migrateLoadingDone(`<thy-loading thyDone></thy-loading>`)).toBe(`<thy-loading [thyLoading]="false"></thy-loading>`);
        expect(migrateLoadingDone(`<thy-loading thyDone="true"></thy-loading>`)).toBe(
            `<thy-loading [thyLoading]="false"></thy-loading>`
        );
    });

    it('should remove thyDone when it is false', () => {
        expect(migrateLoadingDone(`<thy-loading thyDone="false"></thy-loading>`)).toBe(`<thy-loading></thy-loading>`);
        expect(migrateLoadingDone(`<thy-loading [thyDone]="false"></thy-loading>`)).toBe(`<thy-loading></thy-loading>`);
    });

    it('should migrate a bound true literal to thyLoading false', () => {
        expect(migrateLoadingDone(`<thy-loading [thyDone]="true"></thy-loading>`)).toBe(
            `<thy-loading [thyLoading]="false"></thy-loading>`
        );
    });

    it('should negate a bound thyDone expression', () => {
        expect(migrateLoadingDone(`<thy-loading [thyDone]="done"></thy-loading>`)).toBe(
            `<thy-loading [thyLoading]="!(done)"></thy-loading>`
        );
    });

    it('should drop an existing thyLoading when thyDone is explicit', () => {
        expect(migrateLoadingDone(`<thy-loading [thyLoading]="loading" [thyDone]="done"></thy-loading>`)).toBe(
            `<thy-loading [thyLoading]="!(done)"></thy-loading>`
        );
        expect(migrateLoadingDone(`<thy-loading thyLoading [thyDone]="false"></thy-loading>`)).toBe(`<thy-loading></thy-loading>`);
    });

    it('should not migrate thyDone on other elements', () => {
        const content = `<thy-select thyDone="true"></thy-select>`;
        expect(migrateLoadingDone(content)).toBe(content);
    });
});
