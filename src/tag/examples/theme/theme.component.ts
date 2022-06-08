import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-tag-theme-example',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})
export class ThyTagThemeExampleComponent implements OnInit {
    themes = ['fill', 'outline', 'emboss'];

    theme = 'fill';

    constructor() {}

    ngOnInit(): void {}
}
