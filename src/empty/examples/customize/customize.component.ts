import { Component } from '@angular/core';
import { ThyEmpty } from 'ngx-tethys/empty';
import { ThyButton } from 'ngx-tethys/button';

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
    ],
    imports: [ThyEmpty, ThyButton]
})
export class ThyEmptyCustomizeExampleComponent {
    constructor() {}

    goHome() {}
}
