import { Component, input, TemplateRef, ChangeDetectionStrategy, viewChild, inject, output, signal, contentChild } from '@angular/core';
import { ThySelectOptionGroup } from './group/option-group.component';
import { SafeAny } from 'ngx-tethys/types';

export class ThyOptionSelectionChangeEvent {
    constructor(
        public option: ThyOption,
        public isUserInput = false
    ) {}
}

/**
 * 选项组件
 * @name thy-option
 */
@Component({
    selector: 'thy-option',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyOption {
    /**
     * 选项的值，具有唯一性
     */
    readonly thyValue = input<SafeAny>();

    /**
     * 选项的原始值
     */
    readonly thyRawValue = input<SafeAny>();

    /**
     * 选项的文本
     */
    readonly thyLabelText = input<string>();

    /**
     * 是否显示自定义模板
     */
    readonly thyShowOptionCustom = input<boolean>();

    /**
     * 搜索关键字
     */
    readonly thySearchKey = input<string>();

    /**
     * 是否禁用
     */
    readonly thyDisabled = input<boolean>();

    /**
     * 是否选中，会跟随 ThyOptionSelectionChangeEvent 抛出去
     */
    readonly selected = signal(false);

    /**
     * 选项被选中时的回调
     */
    readonly selectionChange = output<ThyOptionSelectionChangeEvent>();

    /**
     * 模板
     */
    readonly template = viewChild<TemplateRef<SafeAny>>(TemplateRef);

    readonly suffixTemplate = contentChild<TemplateRef<SafeAny>>('suffixTemplate');

    private readonly optionGroupComponent = inject(ThySelectOptionGroup, { optional: true });

    get groupLabel() {
        return this.optionGroupComponent?.thyGroupLabel() || '';
    }
}
