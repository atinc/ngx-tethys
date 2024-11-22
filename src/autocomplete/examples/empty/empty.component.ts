import { Component } from '@angular/core';

@Component({
    selector: 'thy-autocomplete-empty-example',
    templateUrl: './empty.component.html'
})
export class ThyAutocompleteEmptyExampleComponent {
    value = '';

    items: Array<{ label: string; value: string }> = [];

    valueChange(event: string) {}
}
