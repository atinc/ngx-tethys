import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
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
    @Input() thyAuthor?: string | TemplateRef<void>;

    /**
     * 展示评论作者头像
     */
    @Input() thyDatetime?: string | TemplateRef<void>;

    /**
     * 展示评论时间
     */
    @Input() thyAvatar?: string | TemplateRef<void>;

    constructor() {}
}
