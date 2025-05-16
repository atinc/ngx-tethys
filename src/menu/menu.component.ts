import { Component, input, OnInit } from '@angular/core';
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
        '[class.thy-menu-collapsed]': 'thyCollapsed()',
        '[class.thy-menu-theme-loose]': 'thyTheme() === "loose"',
        '[class.thy-menu-theme-dark]': 'thyTheme() === "dark"'
    }
})
export class ThyMenu implements OnInit {
    /**
     * 主题
     * @type compact | loose
     */
    readonly thyTheme = input<ThyMenuTheme, ThyMenuTheme>('compact', {
        transform: (value: ThyMenuTheme) => value || 'compact'
    });

    /**
     * 是否收起
     */
    readonly thyCollapsed = input(false, { transform: coerceBooleanProperty });

    constructor() {}

    ngOnInit(): void {}
}
