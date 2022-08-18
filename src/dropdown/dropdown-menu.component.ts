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
import { fromEvent } from 'rxjs';
import { debounceTime, shareReplay } from 'rxjs/operators';
import { SafeAny } from 'ngx-tethys/types';

export type ThyDropdownMenuDividerType = 'default' | 'crossing' | '';

@Directive()
export class ThyDropdownAbstractMenu {
    @HostBinding('class.thy-dropdown-menu') addDropdownMenuClass = true;
}

/**
 * 下拉菜单组件
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
    host: {}
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
    }
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
 */
@Component({
    selector: 'thy-dropdown-menu-divider',
    template: `
        <!-- <div class="dropdown-menu-divider-title">{{ title }}</div> -->
    `,
    host: {
        class: 'dropdown-menu-divider'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyDropdownMenuDividerComponent {
    constructor() {}
}
