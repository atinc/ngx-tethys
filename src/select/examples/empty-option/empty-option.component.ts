import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-empty-option-example',
    templateUrl: './empty-option.component.html',
    standalone: false
})
export class ThySelectEmptyOptionExampleComponent implements OnInit {
    listOfOption = listOfOption;

    ngOnInit() {}
}
