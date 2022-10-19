import { Directive } from '@angular/core';

@Directive({
    selector: '[thyCommentContent]',
    exportAs: 'thyCommentContent',
    host: { class: 'thy-comment-body-content' }
})
export class ThyCommentContentDirective {}
