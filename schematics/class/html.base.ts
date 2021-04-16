import { CssSelectorForHtml } from 'cyia-code-util';
import { UpdateFileService } from '../utils';
export abstract class HtmlMigrationBase {
    constructor(
        protected filePath: string,
        protected startOffset: number = 0,
        protected instance: CssSelectorForHtml,
        protected updateFileService: UpdateFileService
    ) {}

    abstract run(): void;
}
