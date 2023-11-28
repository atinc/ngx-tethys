import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyComment } from './comment.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyCommentContentDirective } from './comment-content.directive';
import { ThyCommentActionsDirective } from './comment-actions.directive';
@NgModule({
    imports: [
        CommonModule,
        ThySharedModule,
        ThyIconModule,
        ThyAvatarModule,
        ThyComment,
        ThyCommentContentDirective,
        ThyCommentActionsDirective
    ],
    exports: [ThyComment, ThyCommentContentDirective, ThyCommentActionsDirective],
    providers: []
})
export class ThyCommentModule {}
