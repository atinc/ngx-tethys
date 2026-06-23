import { ContentChange } from './content-change';

export class ReplaceContentChange extends ContentChange {
    constructor(
        pos: number,
        public length: number,
        public content: string
    ) {
        super(pos);
    }
}
