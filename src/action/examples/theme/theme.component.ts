import { Component, OnInit } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-theme-example',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss'],
    imports: [ThyAction]
})
export class ThyActionThemeExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
