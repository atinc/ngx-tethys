import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyPopoverHeader, ThyPopoverBody } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-manual-content',
    templateUrl: './popover-content.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyPopoverHeader, ThyPopoverBody]
})
export class ThyPopoverManualContentComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
