import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-select-multiple-example',
    templateUrl: './multiple.component.html',
    imports: [ThySelect, ThyOption, FormsModule]
})
export class ThySelectMultipleExampleComponent implements OnInit {
    listOfOption = listOfOption;

    listOfSelectedValue = ['option1', 'option2'];

    ngOnInit() {}
}
