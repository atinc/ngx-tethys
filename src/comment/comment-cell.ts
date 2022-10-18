import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: 'div[thyCommentContent]',
    exportAs: 'thyCommentContent',
    host: { class: 'thy-comment-content-detail' }
})
export class ThyCommentContentDirective {}
