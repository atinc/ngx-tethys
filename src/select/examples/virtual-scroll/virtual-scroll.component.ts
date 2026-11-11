import { Component } from '@angular/core';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-select-virtual-scroll-example',
    templateUrl: './virtual-scroll.component.html',
    styles: [
        `
            :host {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
            }
            thy-select {
                width: 120px;
            }
        `
    ],
    imports: [ThySelect, ThyOption, FormsModule]
})
export class ThySelectVirtualScrollExampleComponent {
    optionCount = 100;

    listOfOption = Array.from({ length: this.optionCount }, (_, index) => ({
        value: `option ${index + 1}`,
        text: `选项 ${index + 1} `
    }));
}
