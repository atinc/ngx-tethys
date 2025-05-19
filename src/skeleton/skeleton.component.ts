import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, input } from '@angular/core';
import { coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';

/**
 * 骨架屏组件
 * @name thy-skeleton
 * @order 10
 */
@Component({
    selector: 'thy-skeleton',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeleton {
    /**
     * 是否开启动画
     * @default false
     */
    readonly thyAnimated = input<boolean, ThyBooleanInput>(undefined, { transform: coerceBooleanProperty });

    /**
     * 动画速度
     */
    readonly thyAnimatedInterval = input<string | number>();

    /**
     * 骨架主色调
     */
    readonly thyPrimaryColor = input<string>();

    /**
     * 骨架次色调
     */
    readonly thySecondaryColor = input<string>();
}
