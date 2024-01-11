import { InputNumber } from 'ngx-tethys/core';
import { BehaviorSubject } from 'rxjs';

import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

export type ThyPropertiesLayout = 'horizontal' | 'vertical';

/**
 * 属性列表组件
 * @name thy-properties
 */
@Component({
    selector: 'thy-properties',
    templateUrl: './properties.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-properties',
        '[class.thy-properties-vertical]': 'layout === "vertical"',
        '[class.thy-properties-horizontal]': 'layout === "horizontal"',
        '[class.thy-properties-edit-trigger-hover]': 'thyEditTrigger === "hover"',
        '[class.thy-properties-edit-trigger-click]': 'thyEditTrigger === "click"'
    },
    standalone: true
})
export class ThyPropertiesComponent implements OnInit {
    layout$ = new BehaviorSubject<ThyPropertiesLayout>('horizontal');

    layout: ThyPropertiesLayout = 'horizontal';

    /**
     * 展示布局
     * @type "horizontal" | "vertical"
     * @default horizontal
     */
    @Input() set thyLayout(layout: ThyPropertiesLayout) {
        this.layout = layout;
        this.layout$.next(layout);
    }

    /**
     * 设置一行的可以 property-item 的数量
     * @type  number
     */
    @Input() @InputNumber() thyColumn: number = 1;

    /**
     * 设置编辑状态触发方法
     * @type 'hover' | 'click'
     */
    @Input() thyEditTrigger: 'hover' | 'click' = 'hover';

    @HostBinding('style.grid-template-columns')
    get gridTemplateColumns() {
        return `repeat(${this.thyColumn}, 1fr)`;
    }

    constructor() {}

    ngOnInit() {}
}
