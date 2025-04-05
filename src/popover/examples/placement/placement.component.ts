import { Component, OnInit } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyPopoverDirective, ThyPopoverHeader, ThyPopoverBody } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-placement-example',
    templateUrl: './placement.component.html',
    styleUrls: ['./placement.component.scss'],
    imports: [ThyButton, ThyPopoverDirective, ThyPopoverHeader, ThyPopoverBody]
})
export class ThyPopoverPlacementExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
