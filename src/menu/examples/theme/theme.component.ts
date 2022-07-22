import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-menu-theme-example',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})
export class ThyMenuThemeExampleComponent implements OnInit {
    theme: string = 'loose';

    constructor() {}

    coll: boolean;

    ngOnInit(): void {}
}
