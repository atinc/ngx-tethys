import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'arrow-switcher-section',
    templateUrl: './arrow-switcher-section.component.html'
})
export class DemoArrowSwitcherSectionComponent implements OnInit {
    index = 0;
    totalCount = 10;

    exampleCode = `
    <thy-arrow-switcher
      [thyIndex]="index"
      [thyTotal]="totalCount"
      (thyPreviousClick)="onPreviousClick($event)"
      (thyNextClick)="onNextClick($event)"
    ></thy-arrow-switcher>
    `;
    exampleCodeSm = `
    <thy-arrow-switcher
      [thyIndex]="index"
      thySize="sm"
      [thyTotal]="totalCount"
      (thyPreviousClick)="onPreviousClick($event)"
      (thyNextClick)="onNextClick($event)"
    ></thy-arrow-switcher>`;

    apiArrowSwitcherParameters = [
        {
            property: 'thyIndex',
            description: '',
            type: 'number',
            default: ''
        },
        {
            property: 'thyTotalCount',
            description: '',
            type: 'number',
            default: ''
        }
    ];

    constructor() {}

    ngOnInit() {}

    onPreviousClick(event: Event) {
        this.index--;
        console.log('点击上一条' + this.index);
    }

    onNextClick(event: Event) {
        this.index++;
        console.log('点击下一条' + this.index);
    }
}
