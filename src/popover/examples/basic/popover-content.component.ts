import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'thy-popover-basic-content',
    templateUrl: './popover-content.component.html'
})
export class ThyPopoverBasicContentComponent implements OnInit {
    demoData: number[];

    @Input() isAsync = false;

    constructor() {}

    ngOnInit() {
        if (this.isAsync) {
            setTimeout(() => {
                this.demoData = [1, 2, 3, 4];
            }, 1000);
        }
    }
}
