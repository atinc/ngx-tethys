import { InputNumber } from 'ngx-tethys/core';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

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
        '[class.thy-properties-vertical]': 'thyLayout === "vertical"',
        '[class.thy-properties-horizontal]': 'thyLayout === "horizontal"',
        '[class.thy-properties-edit-trigger-hover]': 'thyEditTrigger === "hover"'
    }
})
export class ThyPropertiesComponent implements OnInit {
    /**
     * 展示布局
     * @type "horizontal" | "vertical"
     * @default horizontal
     */
    @Input() thyLayout: 'horizontal' | 'vertical' = 'horizontal';

    /**
     * 设置一行的可以 property-item 的数量
     * @type  number
     * @default 1
     */
    @Input() @InputNumber() thyColumn: number = 1;

    /**
     * 设置编辑状态触发方法
     * @type 'hover' | 'click'
     * @default hover
     */
    @Input() thyEditTrigger: 'hover' | 'click' = 'hover';

    @HostBinding('style.grid-template-columns')
    get gridTemplateColumns() {
        return `repeat(${this.thyColumn}, 1fr)`;
    }

    constructor() {}

    ngOnInit() {}
}
