import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputNumber } from 'ngx-tethys/input-number';

@Component({
    selector: 'thy-input-number-appearance-example',
    templateUrl: './appearance.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyInputNumber, FormsModule]
})
export class ThyInputNumberAppearanceExampleComponent {
    value = 0;
}
