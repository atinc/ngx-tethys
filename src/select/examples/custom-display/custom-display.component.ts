import { Component, OnInit } from '@angular/core';
import { taskTypes } from '../mock-data';

@Component({
    selector: 'thy-select-custom-display-example',
    templateUrl: './custom-display.component.html',
    standalone: false
})
export class ThySelectCustomDisplayExampleComponent implements OnInit {
    optionData = taskTypes;

    selectedTaskType: string;

    selectedTaskTypes: string[];

    ngOnInit() {
        this.selectedTaskType = this.optionData[0].name;

        this.selectedTaskTypes = [this.optionData[0].name, this.optionData[2].name];
    }
}
