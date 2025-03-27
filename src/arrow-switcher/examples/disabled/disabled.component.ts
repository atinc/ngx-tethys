import { Component, OnInit } from '@angular/core';
import { ThyArrowSwitcherEvent } from 'ngx-tethys/arrow-switcher';

@Component({
    selector: 'thy-arrow-switcher-disabled-example',
    templateUrl: './disabled.component.html',
    standalone: false
})
export class ThyArrowSwitcherDisabledExampleComponent implements OnInit {
    index = 4;

    totalCount = 10;

    constructor() {}

    ngOnInit(): void {}

    onPreviousClick(event: ThyArrowSwitcherEvent) {
        console.log('点击上一条' + event.index);
    }

    onNextClick(event: ThyArrowSwitcherEvent) {
        console.log('点击下一条' + event.index);
    }
}
