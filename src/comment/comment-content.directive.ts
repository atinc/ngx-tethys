import { Directive } from '@angular/core';

/**
 * @private
 */
@Directive({
    selector: '[thyCommentContent]',
    exportAs: 'thyCommentContent',
    host: { class: 'thy-comment-content' },
    standalone: true
})
export class ThyCommentContentDirective {}
