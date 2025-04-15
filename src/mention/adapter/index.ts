import { isInputOrTextarea } from 'ngx-tethys/util';
import { TextareaMentionAdapter } from './textarea.adapter';
import { EditableMentionAdapter } from './editable.adapter';
import { MentionInputorElement } from './adapter';

export function createMentionAdapter(element: MentionInputorElement) {
    if (isInputOrTextarea(element)) {
        return new TextareaMentionAdapter(element);
    } else {
        element.contentEditable = 'true';
        return new EditableMentionAdapter(element);
    }
}

export * from './editable.adapter';
export * from './textarea.adapter';
export * from './adapter';
