import { Component, OnInit } from '@angular/core';
import { ThySelectionListChange } from 'ngx-tethys/list';

@Component({
    selector: 'app-list-layout-example',
    templateUrl: './layout.component.html',
    standalone: false
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
