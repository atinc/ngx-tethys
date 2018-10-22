
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ThySelectionListChange } from '../../../../../src/list';

@Component({
    selector: 'demo-list-section',
    templateUrl: './list-section.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DemoListComponent {

    selectionModel = {
        multiple: false,
        stopKeydownEvent: false
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


}
