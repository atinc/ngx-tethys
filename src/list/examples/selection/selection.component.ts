import { Component, OnInit } from '@angular/core';
import { ThySelectionListChange } from 'ngx-tethys';

@Component({
    selector: 'app-list-selection-example',
    templateUrl: './selection.component.html'
})
export class ThyListSelectionExampleComponent implements OnInit {
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
        },
        {
            id: 4,
            name: 'Item 4'
        },
        {
            id: 5,
            name: 'Item 5'
        },
        {
            id: 6,
            name: 'Item 6'
        }
    ];

    // public size = 'md';

    public isMultiple = true;

    public stopKeyBoardEvent = false;

    public selectionModel = {
        selectedValues: [2, 3]
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
