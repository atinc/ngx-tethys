import { ThyPopover } from 'ngx-tethys/popover';
import { Component, OnInit } from '@angular/core';
import { ThyPopoverBasicContentComponent } from './popover-content.component';

@Component({
    selector: 'thy-popover-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyPopoverBasicExampleComponent implements OnInit {
    content = ThyPopoverBasicContentComponent;

    constructor(private thyPopover: ThyPopover) {}

    ngOnInit(): void {}

    close() {
        this.thyPopover.close();
    }
}
