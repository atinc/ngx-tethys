import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-styles-color-example',
    templateUrl: './color.component.html',
    styles: [
        `
            .bg-items > div,
            .btn-bg-items > button {
                display: block;

                margin-bottom: 8px;
            }

            .bg-items > div {
                height: 36px;
                line-height: 36px;
                padding-left: 16px;
            }

            .a-items > a {
                display: block;
                margin-top: 0;
                margin-bottom: 16px;
            }
        `
    ]
})
export class ThyStylesColorExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
