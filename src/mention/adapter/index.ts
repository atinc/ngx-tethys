import { isInputOrTextarea } from '../../util/dom';
import { Mention } from '../interfaces';
import { TextareaMentionAdapter } from './textarea.adapter';
import { EditableMentionAdapter } from './editable.adapter';

export function createMentionAdapter(element: HTMLElement, mention: Mention) {
    if (isInputOrTextarea(element)) {
        return new TextareaMentionAdapter(element, mention);
    } else {
        element.contentEditable = 'true';
        return new EditableMentionAdapter(element, mention);
    }
}

export * from './editable.adapter';
export * from './textarea.adapter';
export * from './adapter';
