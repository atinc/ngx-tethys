import { Component, OnInit } from '@angular/core';
import { ThyPopoverHeader, ThyPopoverBody } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-basic-content',
    templateUrl: './popover-content.component.html',
    imports: [ThyPopoverHeader, ThyPopoverBody]
})
export class ThyPopoverBasicContentComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
