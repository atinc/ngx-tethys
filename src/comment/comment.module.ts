import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyCommentComponent } from './comment.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyCommentContentDirective } from './comment-cell';

const THY_COMMENT_CELLS = [ThyCommentContentDirective];
@NgModule({
    declarations: [ThyCommentComponent, ...THY_COMMENT_CELLS],
    imports: [CommonModule, ThySharedModule, ThyIconModule, ThyAvatarModule],
    exports: [ThyCommentComponent, ...THY_COMMENT_CELLS],
    providers: []
})
export class ThyCommentModule {}
