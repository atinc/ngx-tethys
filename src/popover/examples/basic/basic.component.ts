import { ThyPopover } from 'ngx-tethys/popover';
import { Component, OnInit, inject } from '@angular/core';
import { ThyPopoverBasicContentComponent } from './popover-content.component';

@Component({
    selector: 'thy-popover-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyPopoverBasicExampleComponent implements OnInit {
    private thyPopover = inject(ThyPopover);

    content = ThyPopoverBasicContentComponent;

    ngOnInit(): void {}

    close() {
        this.thyPopover.close();
    }
}
