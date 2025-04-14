import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { ThyPopoverHeader, ThyPopoverBody } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-auto-adaptive-content',
    templateUrl: './auto-adaptive-content.component.html',
    imports: [ThyPopoverHeader, ThyPopoverBody]
})
export class ThyPopoverAutoAdaptiveContentComponent implements OnInit {
    loadingDone = false;

    constructor() {}

    ngOnInit() {
        timer(1000).subscribe(() => {
            this.loadingDone = true;
        });
    }
}
