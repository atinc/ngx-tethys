import { Component, OnInit } from '@angular/core';
import { ThyArrowSwitcherEvent } from '../../../../../src/public-api';

@Component({
    selector: 'arrow-switcher-section',
    templateUrl: './arrow-switcher-section.component.html'
})
export class DemoArrowSwitcherSectionComponent implements OnInit {
    index = 0;
    totalCount = 10;

    exampleCode = `
    <thy-arrow-switcher
      [(ngModel)]="index"
      [thyTotal]="totalCount"
      (thyPrevious)="onPreviousClick($event)"
      (thyNext)="onNextClick($event)"
    ></thy-arrow-switcher>
    `;
    exampleCodeSm = `
    <thy-arrow-switcher
      [(ngModel)]="index"
      thySize="sm"
      [disabled]="true"
      [thyTotal]="totalCount"
      (thyPrevious)="onPreviousClick($event)"
      (thyNext)="onNextClick($event)"
    ></thy-arrow-switcher>`;

    apiArrowSwitcherParameters = [
        {
            property: 'ngModel',
            description: '双向绑定值，当前条数的index',
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
            property: 'thySize',
            description: '尺寸大小,默认尺寸为大号，取值为sm时展示小号',
            type: 'string',
            default: ''
        },
        {
            property: 'disabled',
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

    onPreviousClick(event: ThyArrowSwitcherEvent) {
        console.log('点击上一条' + event.index);
    }

    onNextClick(event: ThyArrowSwitcherEvent) {
        console.log('点击下一条' + event.index);
    }
}
