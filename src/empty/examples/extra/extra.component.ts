import { Component } from '@angular/core';

@Component({
    selector: 'thy-empty-extra-example',
    templateUrl: './extra.component.html',
    styles: [
        `
            .empty-button {
                margin-top: 18px;
            }
        `
    ]
})
export class ThyEmptyExtraExampleComponent {
    constructor() {}

    goHome() {}
}
