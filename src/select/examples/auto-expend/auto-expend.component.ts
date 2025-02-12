import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-auto-expend-example',
    templateUrl: './auto-expend.component.html',
    standalone: false
})
export class ThySelectAutoExpendExampleComponent implements OnInit {
    listOfOption = listOfOption;

    isAutoExpend = true;

    isShow: boolean;

    constructor() {}

    ngOnInit() {}
}
