import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAutocomplete, ThyAutocompleteTriggerDirective } from 'ngx-tethys/autocomplete';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyOption } from 'ngx-tethys/shared';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-autocomplete-custom-example',
    templateUrl: './custom.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyInputDirective, FormsModule, ThyAutocompleteTriggerDirective, ThyAutocomplete, ThyOption, ThyIcon]
})
export class ThyAutocompleteCustomExampleComponent implements OnInit {
    thySize = '';

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
