import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRadioButton, ThyRadioGroup } from 'ngx-tethys/radio';

@Component({
    selector: 'app-radio-size-example',
    templateUrl: './size.component.html',
    imports: [ThyRadioGroup, FormsModule, ThyRadioButton]
})
export class ThyRadioSizeExampleComponent implements OnInit {
    public checkedValue: string;

    constructor() {}

    ngOnInit() {}
}
