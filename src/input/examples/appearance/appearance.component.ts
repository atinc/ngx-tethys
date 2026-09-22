import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyInput, ThyInputDirective } from 'ngx-tethys/input';

@Component({
    selector: 'thy-input-appearance-example',
    templateUrl: './appearance.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyInput, ThyInputDirective, ThyColDirective, ThyRowDirective, FormsModule]
})
export class ThyInputAppearanceExampleComponent {
    public value: any = '';
}
