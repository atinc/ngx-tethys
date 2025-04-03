import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAutocomplete } from '../../autocomplete.component';
import { ThyOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';
import { ThyInputSearch } from 'ngx-tethys/input';

@Component({
    selector: 'thy-autocomplete-input-search-example',
    templateUrl: './input-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyAutocomplete, ThyInputSearch, ThyOption, FormsModule]
})
export class ThyAutocompleteInputSearchExampleComponent implements OnInit {
    keyword = '';

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
