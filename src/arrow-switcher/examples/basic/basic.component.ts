import { Component, OnInit } from '@angular/core';
import { ThyArrowSwitcherEvent } from 'ngx-tethys/arrow-switcher';

@Component({
    selector: 'app-arrow-switcher-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyArrowSwitcherBasicExampleComponent implements OnInit {
    index = 0;

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
