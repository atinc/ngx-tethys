import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyAutocomplete, ThyAutocompleteTriggerDirective } from 'ngx-tethys/autocomplete';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyFormControlAppearance } from 'ngx-tethys/core';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-autocomplete-appearance-example',
    templateUrl: './appearance.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ThyInputDirective,
        FormsModule,
        ThyAutocompleteTriggerDirective,
        ThyAutocomplete,
        ThyOption,
        ThyButtonGroup,
        NgClass,
        ThyButton
    ]
})
export class ThyAutocompleteAppearanceExampleComponent implements OnInit {
    appearances: ThyFormControlAppearance[] = ['outline', 'fill', 'subtle', 'ghost'];

    appearance: ThyFormControlAppearance = 'outline';

    value = '';

    children: Array<{ label: string; value: string }> = [];

    filteredOptions: Array<{ label: string; value: string }> = [];

    ngOnInit() {
        for (let i = 10; i < 36; i++) {
            this.children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.filteredOptions = [...this.children];
    }

    valueChange(newValue: string) {
        this.filteredOptions = this.children.filter(item => item.label.includes(newValue));
    }
}
