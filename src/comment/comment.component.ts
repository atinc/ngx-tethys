import { isTemplateRef } from 'ngx-tethys/util';
import { SafeAny } from 'ngx-tethys/types';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyStringOrTemplateOutletDirective } from 'ngx-tethys/shared';
import { NgTemplateOutlet } from '@angular/common';

/**
 * 评论组件
 * @name thy-comment
 */
@Component({
    selector: 'thy-comment',
    templateUrl: './comment.component.html',
    host: {
        class: 'thy-comment'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet, ThyStringOrTemplateOutletDirective, ThyAvatar]
})
export class ThyComment {
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
