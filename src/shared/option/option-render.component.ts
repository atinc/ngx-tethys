import { Component, TemplateRef, ElementRef, inject, input, output, computed, effect } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { ENTER, SPACE, coerceBooleanProperty, hasModifierKey } from 'ngx-tethys/util';
import { ThyIcon } from 'ngx-tethys/icon';
import { SafeAny } from 'ngx-tethys/types';
import { NgTemplateOutlet } from '@angular/common';
import { useHostRenderer } from '@tethys/cdk/dom';

/**
 * 选项渲染组件
 * @private
 * @name thy-option-render
 */
@Component({
    selector: 'thy-option-render',
    templateUrl: './option-render.component.html',
    imports: [ThyIcon, NgTemplateOutlet],
    host: {
        class: 'thy-option-item',
        '[class.disabled]': 'thyDisabled()',
        '[attr.tabindex]': `tabIndex()`,
        '[class.active]': 'selected()',
        '(click)': 'selectViaInteraction()',
        '(mouseenter)': 'mouseEnter()',
        '(keydown)': 'handleKeydown($event)'
    }
})
export class ThyOptionRender implements Highlightable {
    public element = inject<ElementRef<HTMLElement>>(ElementRef);

    private hostRenderer = useHostRenderer();

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
     * 搜索关键字
     */
    readonly thySearchKey = input<string>();

    /**
     * 是否禁用
     */
    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否显示自定义模板
     */
    readonly thyShowOptionCustom = input(false, { transform: coerceBooleanProperty });

    /**
     * 模板
     */
    readonly thyTemplate = input<TemplateRef<SafeAny>>();

    /**
     * 模板上下文
     */
    readonly thyTemplateContext = input<SafeAny>();

    /**
     * 被选中时，是否显示勾选图标
     */
    readonly thyShowCheckedIcon = input(false, { transform: coerceBooleanProperty });

    /**
     * Select 组件选中的值
     */
    readonly thySelectedValuesMap = input<Map<SafeAny, boolean>>(new Map());

    /**
     * 当前高亮选项的值
     */
    readonly thyActivatedValue = input<SafeAny>();

    /**
     * 点击选项时的回调
     */
    readonly optionClick = output<{ value: SafeAny; isUserInput?: boolean }>();

    /**
     * 鼠标悬浮时的回调
     */
    readonly optionHover = output<SafeAny>();

    /**
     * 是否被选中
     */
    readonly selected = computed(() => {
        return this.thySelectedValuesMap().has(this.thyValue());
    });

    /**
     * 是否高亮
     */
    readonly activated = computed(() => {
        return this.thyActivatedValue() === this.thyValue();
    });

    readonly tabIndex = computed(() => {
        return this.thyDisabled() ? '-1' : '0';
    });

    constructor() {
        effect(() => {
            this.activated() ? this.setActiveStyles() : this.setInactiveStyles();
        });
    }

    mouseEnter() {
        this.optionHover.emit(this.thyValue());
    }

    handleKeydown(event: KeyboardEvent): void {
        if ((event.keyCode === ENTER || event.keyCode === SPACE) && !hasModifierKey(event)) {
            this.selectViaInteraction();
            event.preventDefault();
        }
    }

    selectViaInteraction(): void {
        if (!this.thyDisabled()) {
            this.optionClick.emit({ value: this.thyValue(), isUserInput: true });
        }
    }

    select(): void {
        if (!this.thyDisabled()) {
            if (!this.selected()) {
                this.optionClick.emit({ value: this.thyValue() });
            }
        }
    }

    deselect(): void {
        if (this.selected() || this.thyDisabled()) {
            this.optionClick.emit({ value: this.thyValue() });
        }
    }

    setActiveStyles(): void {
        this.hostRenderer.addClass('hover');
    }

    setInactiveStyles(): void {
        this.hostRenderer.removeClass('hover');
    }
}
