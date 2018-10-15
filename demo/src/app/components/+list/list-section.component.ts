
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'demo-list-section',
    templateUrl: './list-section.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DemoListComponent {

    public apiParameters = [
        {
            property: 'hoverClass',
            description: '选择 Hover  状态的样式',
            type: 'String',
            default: 'key-hover'
        }
    ];

    constructor() {
    }
}
