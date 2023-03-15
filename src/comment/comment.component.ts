import { isTemplateRef } from 'ngx-tethys/util';
import { SafeAny } from 'ngx-tethys/types';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, OnInit } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';
import { ThyAvatarComponent } from 'ngx-tethys/avatar';
import { ThyStringOrTemplateOutletDirective } from 'ngx-tethys/shared';
import { NgIf, NgTemplateOutlet } from '@angular/common';
@Component({
    selector: 'thy-comment',
    templateUrl: './comment.component.html',
    host: {
        class: 'thy-comment'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgTemplateOutlet, ThyStringOrTemplateOutletDirective, ThyAvatarComponent]
})
export class ThyCommentComponent {
    /**
     * 展示评论作者
     */
    @Input() thyAuthor?: string | TemplateRef<SafeAny>;

    /**
     * 展示评论时间
     */
    @Input() thyDatetime?: string | TemplateRef<SafeAny>;

    /**
     * 展示评论作者头像
     */
    @Input() thyAvatar?: string | TemplateRef<SafeAny>;

    isTemplateRef = isTemplateRef;
}
