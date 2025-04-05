import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRadio, ThyRadioButton, ThyRadioGroup } from 'ngx-tethys/radio';

@Component({
    selector: 'app-radio-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyRadio, ThyRadioGroup, FormsModule, ThyRadioButton]
})
export class ThyRadioDisabledExampleComponent {
    public checkedValue = 1;
}
