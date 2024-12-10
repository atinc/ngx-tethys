import { Component, OnInit } from '@angular/core';
import { ThySelectionListChange } from 'ngx-tethys/list';

@Component({
    selector: 'app-list-selection-example',
    templateUrl: './selection.component.html',
    standalone: false
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
        }
    ];

    public isMultiple = true;

    public stopKeyBoardEvent = false;

    public selectionModel = {
        selectedValues: 2
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
