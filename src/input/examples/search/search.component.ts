import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInput, ThyInputGroup, ThyInputSearch } from 'ngx-tethys/input';
import { ThyRowDirective, ThyColDirective } from 'ngx-tethys/grid';
import { ThyButton } from 'ngx-tethys/button';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-input-search-example',
    templateUrl: './search.component.html',
    imports: [ThyInput, ThyInputSearch, ThyInputGroup, ThyRowDirective, ThyColDirective, FormsModule, ThyButton, ThyIcon]
})
export class ThyInputSearchExampleComponent implements OnInit {
    public searchText = '';

    constructor() {}

    ngOnInit() {}

    public change() {
        console.log(this.searchText);
    }
}
