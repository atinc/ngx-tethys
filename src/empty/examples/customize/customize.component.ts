import { Component } from '@angular/core';

@Component({
    selector: 'thy-empty-customize-example',
    templateUrl: './customize.component.html',
    styles: [
        `
            .empty-button {
                margin-top: 18px;
            }
            .demo-empty {
                background-color: var(--gray-10);
                margin-bottom: 15px;
                padding: 20px 0;
            }
            .demo-empty-last {
                margin-bottom: 0;
            }
        `
    ]
})
export class ThyEmptyCustomizeExampleComponent {
    constructor() {}

    goHome() {}
}
