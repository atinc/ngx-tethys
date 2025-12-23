import { Component, OnInit } from '@angular/core';
import { taskTypes } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyText } from 'ngx-tethys/typography';
import { ThyDivider } from 'ngx-tethys/divider';

@Component({
    selector: 'thy-select-custom-display-example',
    templateUrl: './custom-display.component.html',
    imports: [ThySelect, ThyOption, FormsModule, ThyIcon, ThyTag, ThyText, ThyDivider]
})
export class ThySelectCustomDisplayExampleComponent implements OnInit {
    optionData = taskTypes;

    selectedTaskType!: string;

    selectedTaskTypes!: string[];

    ngOnInit() {
        this.selectedTaskType = this.optionData[1].name;

        this.selectedTaskTypes = [this.optionData[0].name, this.optionData[2].name];
    }
}
