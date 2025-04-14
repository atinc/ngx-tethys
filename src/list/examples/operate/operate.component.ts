import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ThyListOption } from 'ngx-tethys/shared';
import { ThySelectionListChange } from 'ngx-tethys/list';
import { ThySelectionList } from 'ngx-tethys/list';
import { ThyButton } from 'ngx-tethys/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-list-operate-example',
    templateUrl: './operate.component.html',
    imports: [ThySelectionList, ThyListOption, ThyButton, FormsModule, CommonModule]
})
export class ThyListOperateExampleComponent implements OnInit {
    @ViewChild(ThySelectionList, { static: true }) thySelectionListComponent: ThySelectionList;

    @ViewChildren(ThyListOption) optionQueryList: QueryList<ThyListOption>;

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

    public stopKeyBoardEvent = false;

    public selectedValues: any[] = [];

    constructor() {}

    ngOnInit() {}

    thyBeforeKeydown = () => {
        return !this.stopKeyBoardEvent;
    };

    selectionChange(event: ThySelectionListChange) {
        console.log(event);
    }

    selectAll() {
        this.thySelectionListComponent.selectAll();
    }

    clearAll() {
        this.thySelectionListComponent.deselectAll();
    }

    clearActiveItem() {
        this.thySelectionListComponent.clearActiveItem();
    }

    determineClearActiveItem() {
        this.items.shift();
        setTimeout(() => {
            this.thySelectionListComponent.options = this.optionQueryList;

            this.thySelectionListComponent.determineClearActiveItem();
        }, 1000);
    }
}
