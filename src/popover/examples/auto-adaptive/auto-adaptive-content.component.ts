import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'thy-popover-auto-adaptive-content',
    templateUrl: './auto-adaptive-content.component.html'
})
export class ThyPopoverAutoAdaptiveContentComponent implements OnInit {
    demoData: number[];

    constructor() {}

    ngOnInit() {
        timer(1000).subscribe(() => {
            this.demoData = [1, 2, 3, 4];
        });
    }
}
