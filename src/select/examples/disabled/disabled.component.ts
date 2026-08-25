import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
                width: 400px;
                margin-bottom: 12px;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySelect, ThyOption, FormsModule]
})
export class ThySelectDisabledExampleComponent implements OnInit {
    listOfOption = listOfOption;

    listOfSelectedValue = ['option1', 'option3'];

    ngOnInit() {}
}
