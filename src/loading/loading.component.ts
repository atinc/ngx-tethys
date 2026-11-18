import { Component, computed, input } from '@angular/core';

import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 加载组件，页面调用接口等待请求时，给用户的反馈
 * @name thy-loading
 * @order 10
 */
@Component({
    selector: 'thy-loading',
    templateUrl: './loading.component.html',
    host: {
        class: 'thy-loading',
        '[class.thy-loading-simple]': 'thySimple()',
        '[class.thy-loading-mask]': 'thyIsMask() && isLoading()',
        '[class.thy-loading-done]': '!isLoading()'
    },
    imports: []
})
export class ThyLoading {
    /**
     * 是否处于加载中。默认 true 表示加载中，false 表示加载结束
     * @default true
     */
    readonly thyLoading = input(true, { transform: coerceBooleanProperty });

    /**
     * 数据是否加载完成（已废弃，将在 v23 彻底移除），请使用 `thyLoading`，与 `thyLoading` 语义相反
     * @deprecated please use thyLoading, will be removed in v23
     */
    readonly thyDone = input(undefined, {
        transform: (value: boolean | undefined) => (value === undefined || value === null ? undefined : coerceBooleanProperty(value))
    });

    readonly isLoading = computed(() => {
        const done = this.thyDone();
        return done !== undefined ? !done : this.thyLoading();
    });

    /**
     * 自定义加载提示文案
     */
    readonly thyTips = input<string>('');

    /**
     * 自定义加载提示文案（已废弃，将在 v23 彻底移除），请使用 thyTips
     * @deprecated please use thyTips, will be remove in v23
     */
    readonly thyTip = input<string>('');

    readonly tips = computed(() => this.thyTips() || this.thyTip());

    /**
     * 加载时是否启用嵌套遮罩模式，不传或传 false，没有遮罩层，加载完成出现内容
     */
    readonly thyIsMask = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否为简单模式。简单模式是行内指示器，不占满宽度、无上下内边距，间距和居中由外层容器决定
     * @default false
     */
    readonly thySimple = input(false, { transform: coerceBooleanProperty });
}
