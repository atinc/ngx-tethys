import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    HostBinding,
    TemplateRef,
    ViewEncapsulation,
    input,
    viewChild
} from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty, coerceCssPixelValue } from 'ngx-tethys/util';

export type ThyDropdownMenuDividerType = 'default' | 'crossing' | '';

export const THY_DROPDOWN_DEFAULT_WIDTH = '240px';

/**
 * @private
 */
@Directive()
export class ThyDropdownAbstractMenu {
    @HostBinding('class.thy-dropdown-menu') addDropdownMenuClass = true;
}

/**
 * 下拉菜单组件
 * @name thy-dropdown-menu
 * @order 20
 */
@Component({
    selector: 'thy-dropdown-menu',
    template: `
        @if (thyImmediateRender()) {
            <ng-container *ngTemplateOutlet="content"></ng-container>
        }
        <ng-template #dropdownMenu>
            <div class="thy-dropdown-menu" [style.width]="thyWidth()">
                <ng-container *ngTemplateOutlet="content"></ng-container>
            </div>
        </ng-template>
        <ng-template #content>
            <ng-content></ng-content>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.thy-dropdown-menu]': 'thyImmediateRender()',
        '[style.width]': "thyImmediateRender() ? thyWidth() : ''"
    },
    imports: [NgTemplateOutlet]
})
export class ThyDropdownMenuComponent {
    readonly templateRef = viewChild.required<TemplateRef<SafeAny>>('dropdownMenu');

    /**
     * 设置菜单宽度
     */
    readonly thyWidth = input(THY_DROPDOWN_DEFAULT_WIDTH, { transform: coerceCssPixelValue });

    /**
     * 是否直接渲染 dropdown-menu 中的元素
     */
    readonly thyImmediateRender = input(false, { transform: coerceBooleanProperty });

    constructor() {}
}

/**
 * 下拉菜单分组
 * @name thy-dropdown-menu-group
 * @order 50
 */
@Component({
    selector: 'thy-dropdown-menu-group',
    template: `
        <div class="dropdown-menu-group-title">{{ thyTitle() }}</div>
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'dropdown-menu-group'
    }
})
export class ThyDropdownMenuGroup {
    /**
     * 分组标题
     */
    readonly thyTitle = input<string>();

    constructor() {}
}

/**
 * 下拉菜单分割线
 * @name thy-dropdown-menu-divider
 */
@Component({
    selector: 'thy-dropdown-menu-divider',
    template: ` <!-- <div class="dropdown-menu-divider-title">{{ title }}</div> --> `,
    host: {
        class: 'dropdown-menu-divider'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyDropdownMenuDivider {
    constructor() {}
}
