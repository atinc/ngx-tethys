import { Component, OnInit, HostBinding, ElementRef, Input, Host } from '@angular/core';

export type ThyMenuTheme = 'compact' | 'loose' | 'dark';

/**
 * 菜单组件，支持`thy-menu,[thy-menu],[thyMenu]`三种形式
 */
@Component({
    selector: 'thy-menu,[thy-menu],[thyMenu]',
    templateUrl: './menu.component.html',
    host: {
        class: 'thy-menu',
        '[class.menu-theme-loose]': 'theme === "loose"',
        '[class.menu-theme-dark]': 'theme === "dark"'
    }
})
export class ThyMenuComponent implements OnInit {
    @HostBinding('class.thy-menu') isThyMenu = true;

    theme: ThyMenuTheme = 'compact';

    /**
     * 主题，分别为 'compact' | 'loose'
     * @default compact
     */
    @Input() set thyTheme(value: ThyMenuTheme) {
        this.theme = value;
    }

    get thyTheme() {
        return this.theme;
    }

    constructor() {}

    ngOnInit(): void {}
}
