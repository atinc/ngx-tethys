import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { listOfOption } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-select-auto-expend-example',
    templateUrl: './auto-expend.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySelect, ThyOption]
})
export class ThySelectAutoExpendExampleComponent implements OnInit {
    listOfOption = listOfOption;

    isAutoExpend = true;

    isShow!: boolean;

    constructor() {}

    ngOnInit() {}
}
