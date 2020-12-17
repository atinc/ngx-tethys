import { Component } from '@angular/core';

@Component({
    selector: 'thy-empty-another-extra-example',
    templateUrl: './another-extra.component.html',
    styles: [
        `
            .sub-message {
                text-align: center;
                font-size: 14px;
                color: #888;
                margin-top: 14px;
            }
            .empty-button {
                margin-top: 18px;
            }
        `
    ]
})
export class ThyEmptyAnotherExtraExampleComponent {
    constructor() {}

    goHome() {}
}
