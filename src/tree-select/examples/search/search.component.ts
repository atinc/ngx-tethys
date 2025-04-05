import { Component, OnInit } from '@angular/core';
import { searchTreeSelectData } from '../mock-data';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';

@Component({
    selector: 'app-tree-select-search-example',
    templateUrl: './search.component.html',
    imports: [ThyTreeSelect]
})
export class ThyTreeSelectSearchExampleComponent implements OnInit {
    public treeSelectNodes = searchTreeSelectData;

    public selectedValue = '';

    treeShowSearch = true;

    constructor() {}

    ngOnInit() {}
}
