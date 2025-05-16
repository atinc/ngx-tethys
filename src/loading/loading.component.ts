import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, inject, input } from '@angular/core';

import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 加载组件，页面调用接口等待请求时，给用户的反馈
 * @name thy-loading
 * @order 10
 */
@Component({
    selector: 'thy-loading',
    templateUrl: './loading.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class ThyLoading {
    /**
     * 数据是否加载完成
     * @default false
     */
    readonly thyDone = input(false, { transform: coerceBooleanProperty });

    /**
     * 自定义加载提示文案
     */
    readonly thyTip = input<string>('');

    /**
     * 加载时是否启用嵌套遮罩模式，不传或传 false，没有遮罩层，加载完成出现内容
     */
    readonly thyIsMask = input(false, { transform: coerceBooleanProperty });


    @HostBinding('class.thy-loading') loadingClassName = true;
}
