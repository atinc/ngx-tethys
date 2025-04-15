import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThySelectionList } from 'ngx-tethys/list';
import { ThyListOption } from 'ngx-tethys/shared';
import { CommonModule } from '@angular/common';
import { ThyRadioGroup, ThyRadioButton } from 'ngx-tethys/radio';

@Component({
    selector: 'app-list-unique-key-example',
    templateUrl: './unique-key.component.html',
    imports: [FormsModule, ThySelectionList, ThyListOption, ThyIcon, CommonModule, ThyRadioGroup, ThyRadioButton]
})
export class ThyListUniqueKeyExampleComponent implements OnInit {
    public gridUniqueKeyItems = [
        {
            id: 1,
            name: 'Grid Item 1'
        },
        {
            id: 2,
            name: 'Grid Item Same'
        },
        {
            id: 3,
            name: 'Grid Item Same'
        },
        {
            id: 4,
            name: 'Grid Item 4'
        },
        {
            id: 5,
            name: 'Grid Item 5'
        }
    ];

    public gridUniqueKey = 'name';

    public selectionObjectModel: any = { id: 2, name: 'Grid Item Same' };

    constructor() {}

    ngOnInit() {}
}
