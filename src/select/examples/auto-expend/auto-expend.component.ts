import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-select-auto-expend-example',
    templateUrl: './auto-expend.component.html',
    imports: [ThySelect, ThyOption]
})
export class ThySelectAutoExpendExampleComponent implements OnInit {
    listOfOption = listOfOption;

    isAutoExpend = true;

    isShow!: boolean;

    constructor() {}

    ngOnInit() {}
}
