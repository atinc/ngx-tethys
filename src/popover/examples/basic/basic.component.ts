import { ThyPopoverConfig } from 'ngx-tethys/popover';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyPopoverBasicContentComponent } from './popover-content.component';

@Component({
    selector: 'thy-popover-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyPopoverBasicExampleComponent implements OnInit {
    content = ThyPopoverBasicContentComponent;

    constructor() {}

    ngOnInit(): void {}
}
