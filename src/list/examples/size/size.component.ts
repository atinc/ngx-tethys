import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThySelectionList, ThySelectionListChange } from 'ngx-tethys/list';
import { ThyListOption } from 'ngx-tethys/shared';

@Component({
    selector: 'app-list-size-example',
    templateUrl: './size.component.html',
    imports: [ThySelectionList, ThyListOption, FormsModule, ThyIcon]
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
