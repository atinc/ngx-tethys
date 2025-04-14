import { Component, OnInit } from '@angular/core';
import { ThyPopoverPassDataContentComponent } from './popover-content.component';
import { ThyButton } from 'ngx-tethys/button';
import { ThyPopoverDirective } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-pass-data-example',
    templateUrl: './pass-data.component.html',
    styleUrls: ['./pass-data.component.scss'],
    imports: [ThyButton, ThyPopoverDirective]
})
export class ThyPopoverPassDataExampleComponent implements OnInit {
    content = ThyPopoverPassDataContentComponent;

    constructor() {}

    ngOnInit() {}
}
