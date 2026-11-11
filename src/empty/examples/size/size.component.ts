import { Component } from '@angular/core';
import { ThyEmpty } from 'ngx-tethys/empty';

@Component({
    selector: 'thy-empty-size-example',
    templateUrl: './size.component.html',
    styles: [
        `
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
    imports: [ThyEmpty]
})
export class ThyEmptySizeExampleComponent {
    constructor() {}
}
