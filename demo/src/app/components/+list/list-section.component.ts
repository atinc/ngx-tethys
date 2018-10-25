
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ContentChild, ViewChild } from '@angular/core';
import { ThySelectionListChange, ThySelectionListComponent, } from '../../../../../src/list';

@Component({
    selector: 'demo-list-section',
    templateUrl: './list-section.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DemoListComponent {

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
        }
    ];

    items = this.allItems;

    selectionModel = {
        multiple: true,
        stopKeydownEvent: false,
        selectAll: false,
        defaultValues: ['2', '3']
    };

    public apiParameters = [
        {
            property: 'hoverClass',
            description: '选择 Hover  状态的样式',
            type: 'String',
            default: 'key-hover'
        }
    ];

    thyBeforeKeydown = () => {
        return !this.selectionModel.stopKeydownEvent;
    }

    constructor() {
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
        this.items = this.allItems.filter((item) => {
            return !this.searchText || item.name.includes(this.searchText);
        });
    }

    clearSearch() {
        this.items = this.allItems;
    }

}
