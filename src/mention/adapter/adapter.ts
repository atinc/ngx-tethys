import { MentionDefaultDataItem, Mention } from '../interfaces';

export interface SeekQueryResult {
    term: string;
    start: number;
    end: number;
}

export interface MatchedMention<T = MentionDefaultDataItem> {
    query: SeekQueryResult;
    mention: Mention<T>;
}

export abstract class MentionAdapter {
    inputor: HTMLElement;

    matchedMention: MatchedMention;

    constructor(inputor: HTMLElement) {
        this.inputor = inputor;
    }

    abstract seekQuery(event: Event, mention: Mention): SeekQueryResult;

    abstract insertMention(item: MentionDefaultDataItem): void;

    lookup(event: Event, mentions: Mention[]) {
        this.matchedMention = null;
        for (const mention of mentions) {
            const query = this.seekQuery(event, mention);
            if (query) {
                this.matchedMention = {
                    query: query,
                    mention: mention
                };
                break;
            }
        }
        return this.matchedMention;
    }
}
