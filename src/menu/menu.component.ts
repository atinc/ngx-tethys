import { Component, OnInit, Input } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';

export type ThyMenuTheme = 'compact' | 'loose' | 'dark';

/**
 * 菜单组件，支持`thy-menu,[thy-menu],[thyMenu]`三种形式
 * @name thy-menu,[thy-menu],[thyMenu]
 */
@Component({
    selector: 'thy-menu,[thy-menu],[thyMenu]',
    templateUrl: './menu.component.html',
    host: {
        class: 'thy-menu',
        '[class.thy-menu-collapsed]': 'thyCollapsed',
        '[class.thy-menu-theme-loose]': 'theme === "loose"',
        '[class.thy-menu-theme-dark]': 'theme === "dark"'
    },
    standalone: true
})
export class ThyMenuComponent implements OnInit {
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
    @Input() @InputBoolean() thyCollapsed: boolean;

    constructor() {}

    ngOnInit(): void {}
}
