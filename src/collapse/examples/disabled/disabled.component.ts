import { Component, OnInit } from '@angular/core';
import { ThyCollapse, ThyCollapseItem } from 'ngx-tethys/collapse';

@Component({
    selector: 'thy-collapse-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyCollapse, ThyCollapseItem]
})
export class ThyCollapseDisabledExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
