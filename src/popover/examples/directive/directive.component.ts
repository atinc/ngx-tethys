import { Component, OnInit } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys';
import { ThyPopoverBasicContentComponent } from '../basic/popover-content.component';

@Component({
    selector: 'thy-popover-directive-example',
    templateUrl: './directive.component.html'
})
export class ThyPopoverDirectiveExampleComponent implements OnInit {
    placement: ThyPlacement = 'bottom';
    trigger = 'hover';

    showDelay = 1000;
    hideDelay = 1000;

    config = {
        panelClass: 'demo-popover'
    };

    contentComponent = ThyPopoverBasicContentComponent;

    constructor() {}

    ngOnInit() {}
}
