import { Component, OnInit } from '@angular/core';
import { ThyCollapse, ThyCollapseItem } from 'ngx-tethys/collapse';

@Component({
    selector: 'thy-collapse-accordion-example',
    templateUrl: './accordion.component.html',
    imports: [ThyCollapse, ThyCollapseItem]
})
export class ThyCollapseAccordionExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
