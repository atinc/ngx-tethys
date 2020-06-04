import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { clamp } from '../../../../../src/util/helpers';
import { apiParameters } from './api-parameters';

const allColors = [
    '#22d7bb',
    '#18bfa4',
    '#2cccda',
    '#2dbcff',
    '#4e8af9',
    '#7076fa',
    '#9473fd',
    '#c472ee',
    '#ef7ede',
    '#f969aa',
    '#fc587b',
    '#fa5a55',
    '#ff7747',
    '#ffa415',
    '#ffd234',
    '#99d75a',
    '#66c060',
    '#39ba5d'
];

@Component({
    selector: 'app-demo-progress-section',
    templateUrl: './progress-section.component.html'
})
export class DemoProgressSectionComponent implements OnInit, AfterViewInit {
    @ViewChild('customProgressTips', { static: true }) templateTips: TemplateRef<HTMLElement>;

    value = 40;

    max = 100;

    size = 'md';

    basicCodeExample = require('!!raw-loader!./basic/progress-basic-demo.component.html');

    stackedCodeExample = require('!!raw-loader!./stacked/progress-stacked-demo.component.html');

    tooltipCodeExample = require('!!raw-loader!./template/template.component.html');

    apiParameters = apiParameters;

    stacked = [];

    constructor() {}

    randomStacked(): void {
        const types = ['success', 'warning', 'danger', 'info', 'primary'];

        const stacked = [];
        for (let i = 0; i < 5; i++) {
            const value = Math.floor(Math.random() * 100 + 10);
            stacked.push({
                value,
                type: types[i]
            });
        }
        this.stacked = stacked;
    }

    getUniqueIndexes(count = 5, max = 20) {
        const result = [];
        while (result.length < count) {
            const index = Math.floor(Math.random() * max);
            if (result.indexOf(index) === -1) {
                result.push(index);
            }
        }
        return result;
    }

    randomCustomColorStacked(templateRef?: TemplateRef<HTMLElement>) {
        const stacked = [];
        const colorIndexes = this.getUniqueIndexes(5, allColors.length);
        for (let i = 0; i < 5; i++) {
            const value = Math.floor(Math.random() * 100 + 10);
            stacked.push({
                value,
                color: allColors[colorIndexes[i]],
                tips: value > 30 ? `value: ${value}` : templateRef
            });
        }
        this.stacked = stacked;
    }

    ngOnInit() {
        // this.randomStacked();
    }

    ngAfterViewInit() {
        this.stacked = [
            {
                type: 'success',
                value: 20,
                tips: 'tips'
            },
            {
                type: 'warning',
                value: 20,
                tips: 'hey'
            },
            {
                type: 'danger',
                value: 20,
                tips: this.templateTips
            },
            {
                type: 'info',
                value: 30,
                color: '#7076fa',
                label: 'custom color'
            }
        ];
    }

    increase() {
        this.value = clamp(this.value + 10);
    }

    decrease() {
        this.value = clamp(this.value - 10);
    }
}
