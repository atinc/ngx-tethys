import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-typography-background-example',
    templateUrl: './background.component.html',
    styles: [
        `
            div {
                padding: 16px;
                margin-bottom: 8px;
            }
        `
    ]
})
export class ThyTypographyBackgroundExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
