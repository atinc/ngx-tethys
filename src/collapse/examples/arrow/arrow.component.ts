import { Component, OnInit } from '@angular/core';
import { ThyCollapse, ThyCollapseItem } from 'ngx-tethys/collapse';

@Component({
    selector: 'thy-collapse-arrow-example',
    templateUrl: './arrow.component.html',
    imports: [ThyCollapse, ThyCollapseItem]
})
export class ThyCollapseArrowExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
