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
      (thyPrevious)="onPreviousClick($event)"
      (thyNext)="onNextClick($event)"
    ></thy-arrow-switcher>
    `;
    exampleCodeSm = `
    <thy-arrow-switcher
      [thyIndex]="index"
      thySize="sm"
      [thyTotal]="totalCount"
      (thyPrevious)="onPreviousClick($event)"
      (thyNext)="onNextClick($event)"
    ></thy-arrow-switcher>`;

    apiArrowSwitcherParameters = [
        {
            property: 'thyIndex',
            description: '当前条数的index',
            type: 'number',
            default: ''
        },
        {
            property: 'thyTotalCount',
            description: '总条数',
            type: 'number',
            default: ''
        },
        {
            property: 'thyDisabled',
            description: '是否禁用按钮',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyPrevious',
            description: '点击上一条事件',
            type: 'function',
            default: ''
        },
        {
            property: 'thyNext',
            description: '点击下一条事件',
            type: 'function',
            default: ''
        }
    ];

    constructor() {}

    ngOnInit() {}

    onPreviousClick(event: { index: number; event: Event }) {
        console.log('点击上一条' + event.index);
    }

    onNextClick(event: { index: number; event: Event }) {
        console.log('点击下一条' + event.index);
    }
}
