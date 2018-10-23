
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ContentChild, ViewChild } from '@angular/core';
import { ThySelectionListChange, ThySelectionListComponent, } from '../../../../../src/list';

@Component({
    selector: 'demo-list-section',
    templateUrl: './list-section.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DemoListComponent {

    @ViewChild(ThySelectionListComponent) selectionList: ThySelectionListComponent;

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
        console.log(event.option);
        console.log(event.source);
    }

    toggleSelectAll() {
        if (this.selectionModel.selectAll) {
            this.selectionList.selectAll();
        } else {
            this.selectionList.deselectAll();
        }

    }

}
