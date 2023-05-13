import {
    Directive,
    HostBinding,
    Input,
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef
} from '@angular/core';
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
        <ng-template>
            <div class="thy-dropdown-menu" [style.width.px]="width">
                <ng-content></ng-content>
            </div>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {},
    standalone: true
})
export class ThyDropdownMenuComponent {
    // @HostBinding('class.dropdown-menu--group') themeClassName = false;

    width: number;

    get template() {
        return this.templateRef;
    }

    @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<SafeAny>;

    /**
     * 设置菜单宽度
     * @default 240px
     */
    @Input() set thyWidth(value: number) {
        this.width = value;
    }

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
 * @private
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
