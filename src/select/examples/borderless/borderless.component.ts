import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-select-borderless-example',
    templateUrl: './borderless.component.html',
    imports: [ThySelect, ThyOption]
})
export class ThySelectBorderlessExampleComponent implements OnInit {
    listOfOption = listOfOption;

    ngOnInit() {}
}
