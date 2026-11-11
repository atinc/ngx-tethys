import { Component, OnInit } from '@angular/core';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-styles-color-example',
    templateUrl: './color.component.html',
    styles: [
        `
            .bg-items > div {
                padding: 10px;
                margin-bottom: 8px;
            }
        `
    ],
    imports: [ThyRowDirective, ThyColDirective]
})
export class ThyStylesColorExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
