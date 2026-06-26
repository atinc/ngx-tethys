import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { searchTreeSelectData } from '../mock-data';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tree-select-search-example',
    templateUrl: './search.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTreeSelect, FormsModule, CommonModule]
})
export class ThyTreeSelectSearchExampleComponent implements OnInit {
    public treeSelectNodes = searchTreeSelectData;

    public selectedValue = '';

    treeShowSearch = true;

    constructor() {}

    ngOnInit() {}
}
