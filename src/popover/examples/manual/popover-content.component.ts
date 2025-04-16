import { Component, OnInit } from '@angular/core';
import { ThyPopoverHeader, ThyPopoverBody } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-manual-content',
    templateUrl: './popover-content.component.html',
    imports: [ThyPopoverHeader, ThyPopoverBody]
})
export class ThyPopoverManualContentComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
