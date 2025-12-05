import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-select-disabled-example',
    templateUrl: './disabled.component.html',
    styles: [
        `
            thy-select {
                width!: 400px;
                margin-bottom: 12px;
            }
        `
    ],
    imports: [ThySelect, ThyOption, FormsModule]
})
export class ThySelectDisabledExampleComponent implements OnInit {
    listOfOption = listOfOption;

    listOfSelectedValue = ['option1', 'option3'];

    ngOnInit() {}
}
