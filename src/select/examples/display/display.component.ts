import { Component, OnInit } from '@angular/core';
import { taskTypes } from '../mock-data';

@Component({
    selector: 'thy-select-display-example',
    templateUrl: './display.component.html'
})
export class ThySelectDisplayExampleComponent implements OnInit {
    optionData = taskTypes;

    selectedTaskType: string;

    ngOnInit() {
        this.selectedTaskType = this.optionData[0].name;
    }
}
