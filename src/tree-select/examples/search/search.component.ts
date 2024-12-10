import { Component, OnInit } from '@angular/core';
import { searchTreeSelectData } from '../mock-data';

@Component({
    selector: 'app-tree-select-search-example',
    templateUrl: './search.component.html',
    standalone: false
})
export class ThyTreeSelectSearchExampleComponent implements OnInit {
    public treeSelectNodes = searchTreeSelectData;

    public selectedValue = '';

    treeShowSearch = true;

    constructor() {}

    ngOnInit() {}
}
