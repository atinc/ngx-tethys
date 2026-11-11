import { Component, OnInit } from '@angular/core';
import { ThySelectionList, ThySelectionListChange } from 'ngx-tethys/list';
import { ThyListOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-list-selection-multiple-example',
    templateUrl: './selection-multiple.component.html',
    imports: [ThySelectionList, ThyListOption, FormsModule, CommonModule]
})
export class ThyListSelectionMultipleExampleComponent implements OnInit {
    public items = [
        {
            id: 1,
            name: 'Item 1'
        },
        {
            id: 2,
            name: 'Item 2'
        },
        {
            id: 3,
            name: 'Item 3'
        }
    ];

    public stopKeyBoardEvent = false;

    public selectionModel = {
        selectedValues: [1, 2]
    };

    constructor() {}

    ngOnInit() {}

    thyBeforeKeydown = () => {
        return !this.stopKeyBoardEvent;
    };

    selectionChange(event: ThySelectionListChange) {
        console.log(event);
    }
}
