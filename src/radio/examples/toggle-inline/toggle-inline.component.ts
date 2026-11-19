import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { ThyRadio, ThyRadioGroup } from 'ngx-tethys/radio';

@Component({
    selector: 'app-radio-toggle-inline-example',
    templateUrl: './toggle-inline.component.html',
    imports: [ThyRadio, ThyRadioGroup, FormsModule, ThyCheckbox]
})
export class ThyRadioToggleInlineExampleComponent {
    inlineStatus = false;

    checkedValue = 1;
}
