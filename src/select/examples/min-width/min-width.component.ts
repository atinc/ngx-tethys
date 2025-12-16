import { Component } from '@angular/core';
import { listOfOption } from '../mock-data';
import { THY_SELECT_CONFIG , ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-select-min-width-example',
    templateUrl: './min-width.component.html',
    styles: [
        `
            .select-container {
                display: flex;
                justify-content: left;
                flex-wrap: wrap;
            }
            thy-select {
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
                dropdownWidthMode: 'min-width'
            }
        }
    ],
    imports: [ThySelect, ThyOption, FormsModule]
})
export class ThySelectMinWidthExampleComponent {
    listOfOption = listOfOption;

    trackByFn(index: number, item: { value: string }) {
        return item.value || index;
    }
}
