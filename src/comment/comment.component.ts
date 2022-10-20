import { isTemplateRef } from 'ngx-tethys/util';
import { SafeAny } from './../types/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, OnInit } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';
@Component({
    selector: 'thy-comment',
    templateUrl: './comment.component.html',
    host: {
        class: 'thy-comment',
        '[class.active]': 'active'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyCommentComponent {
    private active = false;

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

    /**
     * 评论 Actions 的 Active 状态，默认为 false，设置为 true 时会在 Comment 上添加 active class
     */
    @Input()
    @InputBoolean()
    set thyCommentActive(value: boolean) {
        this.active = value;
    }

    isTemplateRef = isTemplateRef;
}
