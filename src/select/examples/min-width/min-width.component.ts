import { Component } from '@angular/core';
import { listOfOption } from '../mock-data';
import { THY_SELECT_CONFIG } from 'ngx-tethys/select/select.config';

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
    ],
    providers: [
        {
            provide: THY_SELECT_CONFIG,
            useValue: {
                thyDropdownWidthMode: 'min-width'
            }
        }
    ]
})
export class ThySelectCustomMinWidthExampleComponent {
    listOfOption = listOfOption;
}
