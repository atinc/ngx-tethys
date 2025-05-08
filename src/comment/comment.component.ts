import { isTemplateRef } from 'ngx-tethys/util';
import { SafeAny } from 'ngx-tethys/types';
import { ChangeDetectionStrategy, Component, TemplateRef, input } from '@angular/core';
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
    readonly thyAuthor = input<string | TemplateRef<SafeAny>>();

    /**
     * 展示评论时间
     */
    readonly thyDatetime = input<string | TemplateRef<SafeAny>>();

    /**
     * 展示评论作者头像
     */
    readonly thyAvatar = input<string | TemplateRef<SafeAny>>();

    isTemplateRef = isTemplateRef;
}
