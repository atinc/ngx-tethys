import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyPopoverDirective, ThyPopoverHeader, ThyPopoverBody } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-placement-example',
    templateUrl: './placement.component.html',
    styleUrls: ['./placement.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyButton, ThyPopoverDirective, ThyPopoverHeader, ThyPopoverBody]
})
export class ThyPopoverPlacementExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
