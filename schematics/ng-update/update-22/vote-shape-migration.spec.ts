import { migrateVoteShape } from './vote-shape-migration';

describe('migrateVoteShape', () => {
    it('should migrate thyRound="true" to thyShape="ellipse"', () => {
        const content = `<thy-vote thyRound="true" [thyCount]="10"></thy-vote>`;
        expect(migrateVoteShape(content)).toBe(`<thy-vote thyShape="ellipse" [thyCount]="10"></thy-vote>`);
    });

    it('should migrate bound [thyRound]="true" to thyShape="ellipse"', () => {
        const content = `<span thyVote [thyRound]="true"></span>`;
        expect(migrateVoteShape(content)).toBe(`<span thyVote thyShape="ellipse"></span>`);
    });

    it('should remove thyRound="false"', () => {
        const content = `<thy-vote thyRound="false"></thy-vote>`;
        expect(migrateVoteShape(content)).toBe(`<thy-vote></thy-vote>`);
    });

    it('should remove thyRound when thyShape is already set', () => {
        const content = `<thy-vote thyRound="true" thyShape="rectangle"></thy-vote>`;
        expect(migrateVoteShape(content)).toBe(`<thy-vote thyShape="rectangle"></thy-vote>`);
    });

    it('should leave dynamic [thyRound] bindings unchanged', () => {
        const content = `<thy-vote [thyRound]="isRound"></thy-vote>`;
        expect(migrateVoteShape(content)).toBe(content);
    });

    it('should be idempotent', () => {
        const content = `<thy-vote thyRound="true"></thy-vote>`;
        const once = migrateVoteShape(content);
        const twice = migrateVoteShape(once);
        expect(twice).toBe(once);
        expect(twice).toBe(`<thy-vote thyShape="ellipse"></thy-vote>`);
    });
});
