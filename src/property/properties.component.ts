import { ChangeDetectionStrategy, Component, numberAttribute, input, computed, effect } from '@angular/core';

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
        '[class.thy-properties-vertical]': 'layout() === "vertical"',
        '[class.thy-properties-horizontal]': 'layout() === "horizontal"',
        '[class.thy-property-edit-trigger-hover]': 'thyEditTrigger() === "hover"',
        '[class.thy-property-edit-trigger-click]': 'thyEditTrigger() === "click"',
        '[style.grid-template-columns]': 'gridTemplateColumns()'
    }
})
export class ThyProperties {
    /**
     * 展示布局
     * @type "horizontal" | "vertical"
     * @default horizontal
     */
    readonly layout = input<ThyPropertiesLayout>('horizontal', { alias: 'thyLayout' });

    /**
     * 设置一行的可以 property-item 的数量
     * @type  number
     */
    readonly thyColumn = input(1, { transform: numberAttribute });

    /**
     * 设置编辑状态触发方法
     * @type 'hover' | 'click'
     */
    readonly thyEditTrigger = input<'hover' | 'click'>('hover');

    protected readonly gridTemplateColumns = computed(() => {
        return `repeat(${this.thyColumn()}, 1fr)`;
    });
}
