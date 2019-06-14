import { Component, TemplateRef } from '@angular/core';

@Component({
    selector: 'demo-icon-section',
    templateUrl: './icon-section.component.html',
    styleUrls: ['./icon-section.scss']
})
export class DemoIconSectionComponent {
    apiThyIconParameters = [
        {
            property: 'thyIconName',
            description: `图标名称`,
            type: 'String',
            default: ''
        }
    ];

    constructor() {}
}
