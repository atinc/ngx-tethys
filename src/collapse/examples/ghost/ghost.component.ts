import { Component, OnInit } from '@angular/core';
import { ThyCollapse, ThyCollapseItem } from 'ngx-tethys/collapse';

@Component({
    selector: 'thy-collapse-ghost-example',
    templateUrl: './ghost.component.html',
    imports: [ThyCollapse, ThyCollapseItem]
})
export class ThyCollapseGhostExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
