import { Component, OnInit } from '@angular/core';
import { ThyCollapse, ThyCollapseItem } from 'ngx-tethys/collapse';

@Component({
    selector: 'thy-collapse-bordered-example',
    templateUrl: './bordered.component.html',
    imports: [ThyCollapse, ThyCollapseItem]
})
export class ThyCollapseBorderedExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
