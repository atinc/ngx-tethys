import { Component, OnInit, HostBinding, ElementRef, Input, Host } from '@angular/core';

export type ThyMenuTheme = 'compact' | 'loose';
@Component({
    selector: 'thy-menu,[thy-menu],[thyMenu]',
    templateUrl: './menu.component.html'
})
export class ThyMenuComponent implements OnInit {
    @HostBinding('class.thy-menu') isThyMenu = true;

    @HostBinding('class.menu-theme-loose') menuThemeLoose = false;

    theme: ThyMenuTheme = 'compact';

    @Input() set thyTheme(value: ThyMenuTheme) {
        this.theme = value;
        if (value === 'loose') {
            this.menuThemeLoose = true;
        }
    }

    get thyTheme() {
        return this.theme;
    }

    constructor() {}

    ngOnInit(): void {}
}
