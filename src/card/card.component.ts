import { Component, input } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 卡片组件
 * @name thy-card
 * @order 10
 */
@Component({
    selector: 'thy-card',
    template: ` <ng-content></ng-content> `,
    host: {
        class: 'thy-card',
        '[class.thy-card--divided]': '!!thyDivided()',
        '[class.thy-card--bordered]': '!!thyBordered()',
        '[class.thy-card-sm]': 'thySize() === "sm"',
        '[class.thy-card-lg]': 'thySize() === "lg"'
    }
})
export class ThyCard {
    /**
     * 是否是分割模式，分割模式头部和内容区之间有一条分割线
     */
    readonly thyDivided = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否有边框，边框颜色为#eee
     */
    readonly thyBordered = input(false, { transform: coerceBooleanProperty });

    /**
     * 大小
     * @type sm | md | lg
     */
    readonly thySize = input<'md' | 'sm' | 'lg'>('md');
}
