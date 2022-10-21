import { isTemplateRef } from 'ngx-tethys/util';
import { SafeAny } from './../types/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, OnInit } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';
@Component({
    selector: 'thy-comment',
    templateUrl: './comment.component.html',
    host: {
        class: 'thy-comment'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
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
