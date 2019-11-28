import { Component, OnInit } from '@angular/core';
import { ThySelectionListChange } from 'ngx-tethys';

@Component({
    selector: 'demo-list-object-value',
    templateUrl: './list-object-value.component.html',
    styles: []
})
export class DemoListObjectValueComponent implements OnInit {
    allItems = [
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
        },
        {
            id: 7,
            name: 'Item 7'
        },
        {
            id: 1,
            name: 'Item 1 Repeat'
        }
    ];

    items = [];

    selectionModel = {
        multiple: true,
        stopKeydownEvent: false,
        selectAll: false,
        defaultValues: [2, 3],
        objectValues: [],
        isLayoutGrid: false
    };

    selectionGridModel = {
        multiple: true,
        sm: false,
        defaultValues: [2, 3]
    };

    thyBeforeKeydown = () => {
        return !this.selectionModel.stopKeydownEvent;
    };

    constructor() {}

    ngOnInit() {
        this.items = this.allItems;
    }

    selectionChange(event: ThySelectionListChange) {
        console.log(event);
    }
}
