import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyCollapse, ThyCollapseItem } from 'ngx-tethys/collapse';

@Component({
    selector: 'thy-collapse-ghost-example',
    templateUrl: './ghost.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCollapse, ThyCollapseItem]
})
export class ThyCollapseGhostExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
