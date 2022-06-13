import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'thy-menu-theme-example',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})
export class ThyMenuThemeExampleComponent implements OnInit {
    @HostBinding('class.thy-menu-theme-example') menuTheme = true;
    constructor() {}

    coll: boolean;

    ngOnInit(): void {}
}
