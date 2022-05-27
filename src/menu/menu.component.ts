import { Component, OnInit, HostBinding, ElementRef, Input, Host } from '@angular/core';

export type ThyMenuTheme = 'default' | 'divide';
@Component({
    selector: 'thy-menu,[thy-menu],[thyMenu]',
    templateUrl: './menu.component.html'
})
export class ThyMenuComponent implements OnInit {
    @HostBinding('class.thy-menu') isThyMenu = true;

    @HostBinding('class.menu-theme-divide') menuThemeDivide = false;

    theme: ThyMenuTheme = 'default';

    @Input() set thyTheme(value: ThyMenuTheme) {
        this.theme = value;
        if (value === 'divide') {
            this.menuThemeDivide = true;
        }
    }

    get thyTheme() {
        return this.theme;
    }

    constructor() {}

    ngOnInit(): void {}
}
