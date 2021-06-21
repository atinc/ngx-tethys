import { Component } from '@angular/core';

@Component({
    selector: 'thy-empty-entity-name-example',
    templateUrl: './entity-name.component.html',
    styles: [
        `
            .demo-empty {
                background-color: white;
                margin-bottom: 15px;
                padding: 20px 0;
            }
            .demo-empty-last {
                margin-bottom: 0;
            }
        `
    ]
})
export class ThyEmptyEntityNameExampleComponent {
    constructor() {}
}
