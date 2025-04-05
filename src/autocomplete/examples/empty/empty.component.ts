import { Component } from '@angular/core';
import { ThyAutocomplete } from 'ngx-tethys/autocomplete';
import { FormsModule } from '@angular/forms';
import { ThyAutocompleteTriggerDirective } from 'ngx-tethys/autocomplete';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-autocomplete-empty-example',
    templateUrl: './empty.component.html',
    imports: [ThyInputDirective, FormsModule, ThyAutocompleteTriggerDirective, ThyAutocomplete, ThyOption]
})
export class ThyAutocompleteEmptyExampleComponent {
    value = '';

    items: Array<{ label: string; value: string }> = [];

    valueChange(event: string) {}
}
