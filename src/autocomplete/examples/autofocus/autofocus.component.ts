import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyOption, ThyAutofocusDirective } from 'ngx-tethys/shared';
import { ThyAutocomplete, ThyAutocompleteTriggerDirective } from 'ngx-tethys/autocomplete';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';

@Component({
    selector: 'thy-autocomplete-autofocus-example',
    templateUrl: './autofocus.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyInputDirective, FormsModule, ThyAutofocusDirective, ThyAutocompleteTriggerDirective, ThyAutocomplete, ThyOption]
})
export class ThyAutocompleteAutofocusExampleComponent implements OnInit {
    value = '';

    children: Array<{ label: string; value: string }> = [];

    listOfOption: Array<{ label: string; value: string }> = [];

    constructor() {}

    ngOnInit() {
        for (let i = 10; i < 36; i++) {
            this.children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = [...this.children];
    }

    valueChange(newValue: string) {
        this.listOfOption = this.children.filter(item => item.label.includes(newValue));
    }
}
