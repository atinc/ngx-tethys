import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRadioButton, ThyRadioGroup } from 'ngx-tethys/radio';

@Component({
    selector: 'app-radio-group-button-example',
    templateUrl: './group-button.component.html',
    imports: [ThyRadioGroup, FormsModule, ThyRadioButton]
})
export class ThyRadioGroupButtonExampleComponent implements OnInit {
    public checkedValue: string;

    constructor() {}

    ngOnInit() {}
}
