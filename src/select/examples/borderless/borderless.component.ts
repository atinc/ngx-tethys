import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-borderless-example',
    templateUrl: './borderless.component.html'
})
export class ThySelectBorderlessExampleComponent implements OnInit {
    listOfOption = listOfOption;

    ngOnInit() {}
}
