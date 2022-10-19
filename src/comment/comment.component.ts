import { isTemplateRef } from 'ngx-tethys/util';
import { SafeAny } from './../types/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, OnInit } from '@angular/core';
@Component({
    selector: 'thy-comment',
    templateUrl: './comment.component.html',
    host: {
        class: 'thy-comment'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyCommentComponent implements OnInit {
    /**
     * 展示评论作者
     */
    @Input() thyAuthor?: string | TemplateRef<SafeAny>;

    /**
     * 展示评论作者头像
     */
    @Input() thyDatetime?: string | TemplateRef<SafeAny>;

    /**
     * 展示评论时间
     */
    @Input() thyAvatar?: string | TemplateRef<SafeAny>;

    isAuthorTemplateRef = false;

    isDatetimeTemplateRef = false;

    isAvatarTemplateRef = false;

    ngOnInit(): void {
        if (isTemplateRef(this.thyAuthor)) this.isAuthorTemplateRef = true;
        if (isTemplateRef(this.thyDatetime)) this.isDatetimeTemplateRef = true;
        if (isTemplateRef(this.thyAvatar)) this.isAvatarTemplateRef = true;
    }
}
