import { Directive } from '@angular/core';

@Directive({
    selector: '[thyCommentActions]',
    exportAs: 'thyCommentActions',
    host: { class: 'thy-comment-actions' }
})
export class ThyCommentActionsDirective {}
