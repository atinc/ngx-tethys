import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-multiple-example',
    templateUrl: './multiple.component.html',
    standalone: false
})
export class ThySelectMultipleExampleComponent implements OnInit {
    listOfOption = listOfOption;

    listOfSelectedValue = ['option1', 'option2'];

    ngOnInit() {}
}
