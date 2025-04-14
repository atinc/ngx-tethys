import { Component, OnInit } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';
import { ThyPopoverHeader, ThyPopoverBody, ThyPopoverDirective } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-active-example',
    templateUrl: './active.component.html',
    styleUrls: ['./active.component.scss'],
    imports: [ThyPopoverHeader, ThyPopoverBody, ThyAction, ThyPopoverDirective]
})
export class ThyPopoverActiveExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
