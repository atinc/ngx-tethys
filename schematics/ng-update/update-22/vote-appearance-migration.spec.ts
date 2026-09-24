import { isVoteAppearanceTarget, migrateVoteAppearance } from './vote-appearance-migration';

describe('migrateVoteAppearance', () => {
    it('should detect vote targets', () => {
        expect(isVoteAppearanceTarget('<thy-vote thyVote="primary"></thy-vote>')).toBe(true);
        expect(isVoteAppearanceTarget('<span [thyVote]="\'success-weak\'"></span>')).toBe(true);
        expect(isVoteAppearanceTarget('<thy-button thyButton="primary"></thy-button>')).toBe(false);
    });

    it('should migrate thy-vote thyVote="primary" to thyColor', () => {
        const content = `<thy-vote thyVote="primary"></thy-vote>`;
        expect(migrateVoteAppearance(content)).toBe(`<thy-vote thyColor="primary"></thy-vote>`);
    });

    it('should migrate thy-vote thyVote="primary-weak" to thyColor + thyAppearance', () => {
        const content = `<thy-vote thyVote="primary-weak"></thy-vote>`;
        expect(migrateVoteAppearance(content)).toBe(`<thy-vote thyColor="primary" thyAppearance="subtle"></thy-vote>`);
    });

    it('should migrate bound thyVote on component', () => {
        const content = `<thy-vote [thyVote]="'success-weak'" [thyCount]="10"></thy-vote>`;
        expect(migrateVoteAppearance(content)).toBe(
            `<thy-vote [thyColor]="'success'" thyAppearance="subtle" [thyCount]="10"></thy-vote>`
        );
    });

    it('should keep thyVote color on directive host for fill types', () => {
        const content = `<span [thyVote]="'success'" [thyLayout]="'vertical'"></span>`;
        expect(migrateVoteAppearance(content)).toBe(content);
    });

    it('should migrate weak type on directive host to thyVote color + thyAppearance', () => {
        const content = `<span thyVote="success-weak"></span>`;
        expect(migrateVoteAppearance(content)).toBe(`<span thyVote="success" thyAppearance="subtle"></span>`);
    });

    it('should migrate bound weak type on directive host', () => {
        const content = `<span [thyVote]="'primary-weak'"></span>`;
        expect(migrateVoteAppearance(content)).toBe(`<span [thyVote]="'primary'" thyAppearance="subtle"></span>`);
    });

    it('should not duplicate thyAppearance when already present', () => {
        const content = `<thy-vote thyVote="primary-weak" thyAppearance="subtle"></thy-vote>`;
        expect(migrateVoteAppearance(content)).toBe(`<thy-vote thyColor="primary" thyAppearance="subtle"></thy-vote>`);
    });

    it('should leave tags without thyVote value unchanged', () => {
        const content = `<thy-vote [thyCount]="10"></thy-vote>`;
        expect(migrateVoteAppearance(content)).toBe(content);
    });

    it('should be idempotent', () => {
        const content = `<thy-vote thyVote="primary-weak"></thy-vote>`;
        const once = migrateVoteAppearance(content);
        const twice = migrateVoteAppearance(once);
        expect(twice).toBe(once);
        expect(twice).toBe(`<thy-vote thyColor="primary" thyAppearance="subtle"></thy-vote>`);
    });
});
