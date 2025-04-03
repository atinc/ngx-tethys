import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 卡片组件
 * @name thy-card
 * @order 10
 */
@Component({
    selector: 'thy-card',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-card',
        '[class.thy-card--divided]': '!!thyDivided',
        '[class.thy-card--bordered]': '!!thyBordered',
        '[class.thy-card--clear-left-right-padding]': '!thyHasLeftRightPadding',
        '[class.thy-card-sm]': 'thySize === "sm"',
        '[class.thy-card-lg]': 'thySize === "lg"'
    }
})
export class ThyCard {
    /**
     * 左右是否有内边距，已废弃，如需配置间距使用 spacing 工具样式覆盖默认间距
     * @deprecated
     */
    @Input({ transform: coerceBooleanProperty })
    thyHasLeftRightPadding: boolean | string = true;

    /**
     * 是否是分割模式，分割模式头部和内容区之间有一条分割线
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    thyDivided: boolean | string;

    /**
     * 是否有边框，边框颜色为#eee
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    thyBordered: boolean | string;

    /**
     * 大小
     * @type sm | md | lg
     * @default md
     */
    @Input()
    thySize: 'md' | 'sm' | 'lg';
}
