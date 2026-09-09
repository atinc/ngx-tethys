import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRadio, ThyRadioButton, ThyRadioGroup } from 'ngx-tethys/radio';

@Component({
    selector: 'app-radio-disabled-example',
    templateUrl: './disabled.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyRadio, ThyRadioGroup, FormsModule, ThyRadioButton]
})
export class ThyRadioDisabledExampleComponent {
    public checkedValue = 1;
}
