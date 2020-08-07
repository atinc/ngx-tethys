import { Component, OnInit } from '@angular/core';
import { ThySelectionListChange } from 'ngx-tethys';

@Component({
    selector: 'app-list-grid-example',
    templateUrl: './grid.component.html'
})
export class ThyListGridExampleComponent implements OnInit {
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
        },
        {
            id: 4,
            name: 'Grid Item 4'
        },
        {
            id: 5,
            name: 'Grid Item 5'
        },
        {
            id: 6,
            name: 'Grid Item 6'
        }
    ];

    public isSmallSize = false;

    public isMultiple = true;

    public isGridLayout = true;

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
