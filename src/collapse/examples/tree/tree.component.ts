import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyCollapse, ThyCollapseItem } from 'ngx-tethys/collapse';

@Component({
    selector: 'thy-collapse-tree-example',
    templateUrl: './tree.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCollapse, ThyCollapseItem]
})
export class ThyCollapseTreeExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
