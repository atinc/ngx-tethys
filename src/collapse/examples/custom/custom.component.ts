import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThyCollapse, ThyCollapseItem } from 'ngx-tethys/collapse';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-collapse-custom-example',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [ThyCollapse, ThyCollapseItem, ThyIcon, ThyDivider]
})
export class ThyCollapseCustomExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
