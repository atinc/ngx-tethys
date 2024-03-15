import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';

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
    ]
})
export class ThySelectDisabledExampleComponent implements OnInit {
    listOfOption = listOfOption;

    listOfSelectedValue = ['option1', 'option3'];

    ngOnInit() {}
}
