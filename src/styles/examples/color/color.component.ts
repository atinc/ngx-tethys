import { Component, OnInit } from '@angular/core';

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
    standalone: false
})
export class ThyStylesColorExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
