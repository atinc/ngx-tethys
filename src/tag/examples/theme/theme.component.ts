import { Component, OnInit } from '@angular/core';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { NgClass } from '@angular/common';

@Component({
    selector: 'thy-tag-theme-example',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss'],
    imports: [ThyTag, ThyButtonGroup, NgClass, ThyButton]
})
export class ThyTagThemeExampleComponent implements OnInit {
    themes = ['fill', 'outline', 'weak-fill'];

    theme = 'fill';

    constructor() {}

    ngOnInit(): void {}
}
