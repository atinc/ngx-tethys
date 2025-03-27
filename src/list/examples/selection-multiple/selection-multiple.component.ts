import { Component, OnInit } from '@angular/core';
import { ThySelectionListChange } from 'ngx-tethys/list';

@Component({
    selector: 'app-list-selection-multiple-example',
    templateUrl: './selection-multiple.component.html',
    standalone: false
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
