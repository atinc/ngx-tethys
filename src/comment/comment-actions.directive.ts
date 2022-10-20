import { Directive } from '@angular/core';

/**
 * @private
 */
@Directive({
    selector: '[thyCommentActions]',
    exportAs: 'thyCommentActions',
    host: { class: 'thy-comment-actions-default' }
})
export class ThyCommentActionsDirective {}
