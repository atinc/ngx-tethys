import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyFormControlAppearance } from 'ngx-tethys/core';
import { ThyInputSearch } from 'ngx-tethys/input';

@Component({
    selector: 'thy-input-search-appearance-example',
    templateUrl: './search-appearance.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyInputSearch, FormsModule, ThyButtonGroup, NgClass, ThyButton]
})
export class ThyInputSearchAppearanceExampleComponent {
    appearances: ThyFormControlAppearance[] = ['outline', 'fill', 'subtle', 'ghost'];

    appearance: ThyFormControlAppearance = 'outline';

    value = '';
}
