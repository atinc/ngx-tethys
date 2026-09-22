import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyInputSearch } from 'ngx-tethys/input';

@Component({
    selector: 'thy-input-search-appearance-example',
    templateUrl: './search-appearance.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyInputSearch, ThyColDirective, ThyRowDirective, FormsModule]
})
export class ThyInputSearchAppearanceExampleComponent {
    public value = '';
}
