
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'demo-key-select-section',
    templateUrl: './key-select-section.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DemoKeySelectSectionComponent {

    public apiParameters = [
        {
            property: 'thyAppendText',
            description: '追加文本',
            type: 'String',
            default: ''
        }
    ];

    constructor() {
    }
}
