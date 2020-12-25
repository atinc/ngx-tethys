import { Component } from '@angular/core';

@Component({
    selector: 'thy-empty-another-extra-example',
    templateUrl: './another-extra.component.html',
    styles: [
        `
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
