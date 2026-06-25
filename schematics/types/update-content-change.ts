import { ContentChange } from './content-change';

export class UpdateContentChange extends ContentChange {
    constructor(
        pos: number,
        public content: string
    ) {
        super(pos);
    }
}
