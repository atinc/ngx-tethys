import { Component, OnInit } from '@angular/core';
import { ThyArrowSwitcher, ThyArrowSwitcherEvent } from 'ngx-tethys/arrow-switcher';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-arrow-switcher-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyArrowSwitcher, FormsModule]
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
