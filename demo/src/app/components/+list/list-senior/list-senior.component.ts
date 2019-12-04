import { Component, OnInit, ViewChild } from '@angular/core';
import { ThySelectionListComponent, ThySelectionListChange } from 'ngx-tethys';

@Component({
    selector: 'demo-list-senior',
    templateUrl: './list-senior.component.html',
    styles: []
})
export class DemoListSeniorComponent implements OnInit {
    @ViewChild(ThySelectionListComponent) selectionList: ThySelectionListComponent;

    searchText = '';

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

    toggleSelectAll() {
        if (this.selectionModel.selectAll) {
            this.selectionList.selectAll();
        } else {
            this.selectionList.deselectAll();
        }
    }

    enterSearch() {
        this.items = this.allItems.filter(item => {
            return !this.searchText || item.name.toLowerCase().includes(this.searchText.toLowerCase());
        });
    }

    searchChange() {
        if (this.searchText) {
            this.selectionList.clearActiveItem();
        }
    }

    clearSearch() {
        this.items = this.allItems;
    }
}
