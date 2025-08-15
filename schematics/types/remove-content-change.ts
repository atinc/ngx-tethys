import { ContentChange } from './content-change';

export class RemoveContentChange extends ContentChange {
    constructor(
        pos: number,
        public length: number
    ) {
        super(pos);
    }
}
