import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    HostBinding,
    Input,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';
import { SafeAny } from 'ngx-tethys/types';

export type ThyDropdownMenuDividerType = 'default' | 'crossing' | '';

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
        <ng-container *ngIf="thyImmediateRender; then content"> </ng-container>
        <ng-template #dropdownMenu>
            <div class="thy-dropdown-menu" [style.width]="thyWidth">
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
        '[class.thy-dropdown-menu]': 'thyImmediateRender',
        '[style.width]': "thyImmediateRender ? thyWidth : ''"
    },
    standalone: true,
    imports: [NgIf, NgTemplateOutlet]
})
export class ThyDropdownMenuComponent {
    get template() {
        return this.templateRef;
    }

    @ViewChild('dropdownMenu', { static: true }) templateRef!: TemplateRef<SafeAny>;

    /**
     * 设置菜单宽度
     * @default 240px
     */
    @Input()
    @InputCssPixel()
    thyWidth: number | string;

    /**
     * 是否直接渲染 dropdown-menu 中的元素
     * @default false
     */
    @Input() @InputBoolean() thyImmediateRender = false;

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
        <div class="dropdown-menu-group-title">{{ title }}</div>
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'dropdown-menu-group'
    },
    standalone: true
})
export class ThyDropdownMenuGroupComponent {
    title: string;

    /**
     * 分组标题
     */
    @Input()
    set thyTitle(value: string) {
        this.title = value;
    }

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ThyDropdownMenuDividerComponent {
    constructor() {}
}
