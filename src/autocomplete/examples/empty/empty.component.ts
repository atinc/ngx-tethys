import { Component } from '@angular/core';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyAutocomplete } from '../../autocomplete.component';
import { ThyOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';
import { ThyAutocompleteTriggerDirective } from '../../autocomplete.trigger.directive';

@Component({
    selector: 'thy-autocomplete-empty-example',
    templateUrl: './empty.component.html',
    imports: [ThyInputDirective, ThyAutocomplete, ThyOption, FormsModule, ThyAutocompleteTriggerDirective]
})
export class ThyAutocompleteEmptyExampleComponent {
    value = '';

    items: Array<{ label: string; value: string }> = [];

    valueChange(event: string) {}
}
