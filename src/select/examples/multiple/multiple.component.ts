import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-multiple-example',
    templateUrl: './multiple.component.html',
    imports: [ThySelect, ThyOption, FormsModule]
})
export class ThySelectMultipleExampleComponent implements OnInit {
    listOfOption = listOfOption;

    listOfSelectedValue = ['option1', 'option2', 'option3', 'option4', 'option5'];

    ngOnInit() {}
}
