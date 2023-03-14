import { Directive } from '@angular/core';

/**
 * @private
 */
@Directive({
    selector: '[thyCommentActions]',
    exportAs: 'thyCommentActions',
    host: { class: 'thy-comment-actions' },
    standalone: true
})
export class ThyCommentActionsDirective {}
