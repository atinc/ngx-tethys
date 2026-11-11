import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThySelectionList, ThySelectionListChange } from 'ngx-tethys/list';
import { ThyListOption } from 'ngx-tethys/shared';

@Component({
    selector: 'app-list-layout-example',
    templateUrl: './layout.component.html',
    imports: [ThySelectionList, ThyIcon, ThyListOption, FormsModule, CommonModule]
})
export class ThyListLayoutExampleComponent implements OnInit {
    public gridItems = [
        {
            id: 1,
            name: 'Grid Item 1'
        },
        {
            id: 2,
            name: 'Grid Item 2'
        },
        {
            id: 3,
            name: 'Grid Item 3'
        }
    ];

    public isGridLayout = true;

    public selectionModel = {
        selectedValues: [2, 3]
    };

    constructor() {}

    ngOnInit() {}

    selectionChange(event: ThySelectionListChange) {
        console.log(event);
    }
}
