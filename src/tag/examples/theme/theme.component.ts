import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-tag-theme-example',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss'],
    standalone: false
})
export class ThyTagThemeExampleComponent implements OnInit {
    themes = ['fill', 'outline', 'weak-fill'];

    theme = 'fill';

    constructor() {}

    ngOnInit(): void {}
}
