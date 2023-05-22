import { Component } from '@angular/core';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-min-width-example',
    templateUrl: './min-width.component.html',
    styles: [
        `
            .custom-select-container {
                display: flex;
                justify-content: left;
                flex-wrap: wrap;
            }
            thy-custom-select {
                flex: 0 0 auto;
                width: 100px;
                margin-right: 20px;
            }
        `
    ]
})
export class ThySelectCustomMinWidthExampleComponent {
    listOfOption = listOfOption;
}
