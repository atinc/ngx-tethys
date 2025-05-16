import { collapseMotion } from 'ngx-tethys/core';

import {
    ChangeDetectorRef,
    Component,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
    TemplateRef,
    inject,
    input,
    output,
    computed,
    model
} from '@angular/core';

import { IThyCollapseItemComponent, THY_COLLAPSE_COMPONENT } from './collapse.token';
import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty, isString } from 'ngx-tethys/util';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgTemplateOutlet } from '@angular/common';

const DEFAULT_ARROW_ICON = 'angle-right';

/**
 * 折叠面板项组件
 * @name thy-collapse-panel,thy-collapse-item
 * @order 20
 */
@Component({
    selector: 'thy-collapse-panel, thy-collapse-item',
    templateUrl: './collapse-item.component.html',
    exportAs: 'ThyCollapseComponent',
    animations: [collapseMotion],
    host: {
        '[class.thy-collapse-item]': 'true',
        '[class.thy-collapse-no-arrow]': '!showArrow()',
        '[class.thy-collapse-item-active]': 'thyActive()',
        '[class.thy-collapse-item-disabled]': 'thyDisabled()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet, ThyIcon]
})
export class ThyCollapseItem implements IThyCollapseItemComponent, OnInit, OnDestroy {
    private cdr = inject(ChangeDetectorRef);
    private thyCollapseComponent = inject(THY_COLLAPSE_COMPONENT, { host: true })!;

    /**
     * 标题
     */
    readonly thyTitle = input<string>();

    /**
     * 是否处于激活展开状态
     */
    thyActive = model<boolean>(false);

    /**
     * 是否禁用当前面板
     */
    readonly thyDisabled = input<boolean, boolean | string | number>(false, { transform: coerceBooleanProperty });

    /**
     * 自定义面板头
     */
    readonly thyHeaderTemplate = input<TemplateRef<SafeAny>>();

    /**
     * 自定义箭头(展开收起)图标，设置为 false 表示隐藏图标
     */
    thyArrowIcon = model<string | TemplateRef<SafeAny> | boolean>(DEFAULT_ARROW_ICON);

    arrowIconTemplate = computed(() => {
        const arrowIcon = this.thyArrowIcon();
        return arrowIcon instanceof TemplateRef ? arrowIcon : null;
    });

    arrowIcon = computed(() => {
        const arrowIcon = this.thyArrowIcon();
        return isString(arrowIcon) ? arrowIcon : DEFAULT_ARROW_ICON;
    });

    showArrow = computed(() => {
        const arrowIcon = this.thyArrowIcon();
        if (!(arrowIcon instanceof TemplateRef) && !isString(arrowIcon)) {
            return this.thyArrowIcon();
        }
        return true;
    });

    /**
     * 额外附加模板
     */
    readonly thyExtra = input<TemplateRef<SafeAny>>();

    /**
     * 展开收起事件
     */
    readonly thyActiveChange = output<{ active: boolean; event: Event }>();

    ngOnInit() {
        this.thyCollapseComponent.addPanel(this);
    }

    markForCheck(): void {
        this.cdr.markForCheck();
    }

    activeChange(event: Event) {
        if (!this.thyDisabled()) {
            this.thyCollapseComponent.click(this, event);
        }
    }

    ngOnDestroy(): void {
        this.thyCollapseComponent.removePanel(this);
    }
}
