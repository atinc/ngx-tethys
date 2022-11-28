import { Component, OnInit } from '@angular/core';
import { ThyTableTheme } from 'ngx-tethys/table';
@Component({
    selector: 'thy-skeleton-example-table',
    template: `
        <div class="mb-2">
            <thy-radio-group [(ngModel)]="theme">
                <label thyRadio thyLabelText="Default" thyInline thyValue="default"></label>
                <label thyRadio thyLabelText="Bordered" thyInline thyValue="bordered"></label>
                <label thyRadio thyLabelText="Boxed" thyInline thyValue="boxed"></label>
            </thy-radio-group>
        </div>
        <thy-skeleton-table
            [thyTheme]="theme"
            [thyRowHeight]="model.thyRowHeight"
            [thyColumns]="model.thyColumns"
            [thyRowCount]="model.thyRowCount"
            [thyPrimaryColor]="model.thyPrimaryColor"
            [thySecondaryColor]="model.thySecondaryColor"
            [thyAnimatedInterval]="model.thyAnimatedInterval"
            [thyAnimated]="model.thyAnimated"
            [thyBorderRadius]="model.thyBorderRadius"
        >
        </thy-skeleton-table>
    `
})
export class ThySkeletonExampleTableComponent implements OnInit {
    model = {
        thyBorderRadius: 2,
        thyRowCount: 4,
        thyRowHeight: '18px',
        // thyColumns: 4,
        thyColumns: [18, 'circle:20px', 200, '300px', 300],
        thyPrimaryColor: '#F7F7F7',
        thySecondaryColor: '#aaaaaa',
        thyAnimatedInterval: 1,
        thyAnimated: true
    };
    theme: ThyTableTheme = 'default';
    constructor() {}

    ngOnInit() {}
}
