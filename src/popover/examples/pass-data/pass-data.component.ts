import { Component, OnInit } from '@angular/core';
import { ThyPopoverPassDataContentComponent } from './popover-content.component';
@Component({
    selector: 'thy-popover-pass-data-example',
    templateUrl: './pass-data.component.html',
    styleUrls: ['./pass-data.component.scss'],
    standalone: false
})
export class ThyPopoverPassDataExampleComponent implements OnInit {
    content = ThyPopoverPassDataContentComponent;

    constructor() {}

    ngOnInit() {}
}
