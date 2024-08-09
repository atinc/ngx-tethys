import { Component } from '@angular/core';

@Component({
    selector: 'thy-empty-size-example',
    templateUrl: './size.component.html',
    styles: [
        `
            .demo-empty {
                background-color: var(--color-0);
                margin-bottom: 15px;
                padding: 20px 0;
            }
            .demo-empty-last {
                margin-bottom: 0;
            }
        `
    ]
})
export class ThyEmptySizeExampleComponent {
    constructor() {}
}
