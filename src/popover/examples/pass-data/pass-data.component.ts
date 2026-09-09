import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyPopoverPassDataContentComponent } from './popover-content.component';
import { ThyButton } from 'ngx-tethys/button';
import { ThyPopoverDirective } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-pass-data-example',
    templateUrl: './pass-data.component.html',
    styleUrls: ['./pass-data.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyButton, ThyPopoverDirective]
})
export class ThyPopoverPassDataExampleComponent implements OnInit {
    content = ThyPopoverPassDataContentComponent;

    constructor() {}

    ngOnInit() {}
}
