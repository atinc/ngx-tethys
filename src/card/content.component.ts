import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 卡片内容组件
 * @name thy-card-content
 * @order 30
 */
@Component({
    selector: 'thy-card-content',
    preserveWhitespaces: false,
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-card-content',
        '[class.thy-card-content--scroll]': '!!thyScroll()',
        '[class.thy-card-content--sm]': 'thySize() === "sm"'
    }
})
export class ThyCardContent implements OnInit {
    /**
     * 内容区，滚动
     */
    readonly thyScroll = input<boolean, unknown>(false, { transform: coerceBooleanProperty });

    /**
     * 已废弃，Content 大小，sm 时 padding-top 间距变小
     * @deprecated
     */
    readonly thySize = input<string>('md');

    ngOnInit() {}
}
