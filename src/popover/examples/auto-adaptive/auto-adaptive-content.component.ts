import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'thy-popover-auto-adaptive-content',
    templateUrl: './auto-adaptive-content.component.html',
    standalone: false
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
