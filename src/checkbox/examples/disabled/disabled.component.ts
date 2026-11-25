import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThyCheckbox } from 'ngx-tethys/checkbox';

@Component({
    selector: 'thy-checkbox-disabled-example',
    templateUrl: './disabled.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCheckbox]
})
export class ThyCheckboxDisabledExampleComponent {}
