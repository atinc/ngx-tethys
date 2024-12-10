import { Component, OnInit } from '@angular/core';
import { ThySelectionListChange } from 'ngx-tethys/list';

@Component({
    selector: 'app-list-size-example',
    templateUrl: './size.component.html',
    standalone: false
})
export class ThyListSizeExampleComponent implements OnInit {
    public gridItems = [
        {
            id: 1,
            name: 'Grid Item 1'
        }
    ];

    public selectionModel = {
        selectedValues: [1]
    };

    constructor() {}

    ngOnInit() {}

    selectionChange(event: ThySelectionListChange) {
        console.log(event);
    }
}
