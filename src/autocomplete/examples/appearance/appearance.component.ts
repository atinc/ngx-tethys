import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyAutocomplete, ThyAutocompleteTriggerDirective } from 'ngx-tethys/autocomplete';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
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
        ThyColDirective,
        ThyRowDirective
    ]
})
export class ThyAutocompleteAppearanceExampleComponent implements OnInit {
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
