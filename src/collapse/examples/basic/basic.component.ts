import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyCollapse, ThyCollapseItem } from 'ngx-tethys/collapse';

@Component({
    selector: 'thy-collapse-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCollapse, ThyCollapseItem]
})
export class ThyCollapseBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
