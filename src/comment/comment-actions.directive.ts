import { Directive } from '@angular/core';

/**
 * @private
 */
@Directive({
    selector: '[thyCommentActions]',
    exportAs: 'thyCommentActions',
    host: { class: 'thy-comment-actions' }
})
export class ThyCommentActionsDirective {}
