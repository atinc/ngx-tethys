import { ContentChange, ReplaceContentChange } from '../types';
import { HtmlMigrationBase } from './html.base';

export abstract class ComponentTagChangeBase extends HtmlMigrationBase {
    abstract relation: Record<string, string>;
    run() {
        const contentChangeList: ContentChange[] = [];
        for (const tagName of Object.keys(this.relation)) {
            const result = this.instance.queryAll(tagName);
            result.forEach(item => {
                contentChangeList.push(
                    new ReplaceContentChange(
                        this.startOffset + item.startSourceSpan.start.offset + 1,
                        tagName.length,
                        this.relation[tagName]
                    )
                );
                contentChangeList.push(
                    new ReplaceContentChange(this.startOffset + item.endSourceSpan.start.offset + 2, tagName.length, this.relation[tagName])
                );
            });
        }
        this.updateFileService.change(this.filePath, contentChangeList);
    }
}
