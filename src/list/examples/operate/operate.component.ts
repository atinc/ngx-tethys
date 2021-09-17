import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ThyListOptionComponent, ThySelectionListChange } from 'ngx-tethys';
import { ThySelectionListComponent } from 'ngx-tethys/list/selection/selection-list';

@Component({
    selector: 'app-list-operate-example',
    templateUrl: './operate.component.html'
})
export class ThyListOperateExampleComponent implements OnInit {
    @ViewChild(ThySelectionListComponent, { static: true }) thySelectionListComponent: ThySelectionListComponent;

    @ViewChildren(ThyListOptionComponent) optionQueryList: QueryList<ThyListOptionComponent>;

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
