import { MentionDefaultDataItem, Mention } from '../interfaces';

export interface SeekQueryResult {
    term: string;
    start: number;
    end: number;
}

export abstract class MentionAdapter {
    inputor: HTMLElement;

    mention: Mention;

    constructor(inputor: HTMLElement, mention: Mention) {
        this.inputor = inputor;
        this.mention = mention;
    }

    abstract seekQuery(event: Event): SeekQueryResult;

    abstract insertMention(query: SeekQueryResult, item: MentionDefaultDataItem): void;
}
