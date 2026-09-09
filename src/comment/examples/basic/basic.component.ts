import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyComment, ThyCommentActionsDirective, ThyCommentContentDirective } from 'ngx-tethys/comment';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-comment-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyComment, ThyCommentContentDirective, ThyCommentActionsDirective, ThyAction]
})
export class ThyCommentBasicExampleComponent {
    constructor() {}
}
