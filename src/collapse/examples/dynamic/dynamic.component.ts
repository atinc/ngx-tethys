import { Component, OnInit } from '@angular/core';
import { ThyCollapse, ThyCollapseItem } from 'ngx-tethys/collapse';

@Component({
    selector: 'thy-collapse-dynamic-example',
    templateUrl: './dynamic.component.html',
    imports: [ThyCollapse, ThyCollapseItem]
})
export class ThyCollapseDynamicExampleComponent implements OnInit {
    items = [
        {
            name: 'Title 1',
            content: `The accordion component delivers large amounts of content in a small space through progressive disclosure. The user gets key details
        about the underlying content and can choose to expand that content within the constraints of the accordion. Accordions work especially
        well on mobile interfaces or whenever vertical space is at a premium.`
        },
        {
            name: 'Title 2',
            content: `The accordion component delivers large amounts of content in a small space through progressive disclosure. The user gets key details
        about the underlying content and can choose to expand that content within the constraints of the accordion. Accordions work especially
        well on mobile interfaces or whenever vertical space is at a premium.`
        },
        {
            name: 'Title 3',
            content: `The accordion component delivers large amounts of content in a small space through progressive disclosure. The user gets key details
        about the underlying content and can choose to expand that content within the constraints of the accordion. Accordions work especially
        well on mobile interfaces or whenever vertical space is at a premium.`
        }
    ];

    constructor() {}

    ngOnInit() {}
}
