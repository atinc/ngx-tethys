import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: 'div[thyCommentContent]',
    exportAs: 'thyCommentContent',
    host: { class: 'thy-comment-content-detail' }
})
export class ThyCommentContentDirective {}

@Directive({
    selector: 'div[thyCommentActions]',
    exportAs: 'thyCommentActions',
    host: { class: 'thy-comment-actions' }
})
export class ThyCommentActionsDirective {}
