import { Component, OnInit } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyPopoverDirective, ThyPopoverHeader, ThyPopoverBody } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-trigger-example',
    templateUrl: './trigger.component.html',
    styleUrls: ['./trigger.component.scss'],
    imports: [ThyButton, ThyPopoverDirective, ThyPopoverHeader, ThyPopoverBody]
})
export class ThyPopoverTriggerExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
