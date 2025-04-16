import { Component, OnInit, Input } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyMenuTheme = 'compact' | 'loose' | 'dark';

/**
 * 菜单组件
 * @name thy-menu,[thy-menu],[thyMenu]
 * @order 5
 */
@Component({
    selector: 'thy-menu,[thy-menu],[thyMenu]',
    templateUrl: './menu.component.html',
    host: {
        class: 'thy-menu',
        '[class.thy-menu-collapsed]': 'thyCollapsed',
        '[class.thy-menu-theme-loose]': 'theme === "loose"',
        '[class.thy-menu-theme-dark]': 'theme === "dark"'
    }
})
export class ThyMenu implements OnInit {
    theme: ThyMenuTheme = 'compact';

    /**
     * 主题
     * @type compact | loose
     * @default compact
     */
    @Input() set thyTheme(value: ThyMenuTheme) {
        this.theme = value;
    }

    /**
     * 是否收起
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyCollapsed: boolean;

    constructor() {}

    ngOnInit(): void {}
}
