import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRadio } from 'ngx-tethys/radio';
import { ThyCheckbox } from 'ngx-tethys/checkbox';

@Component({
    selector: 'app-radio-toggle-inline-example',
    templateUrl: './toggle-inline.component.html',
    imports: [ThyRadio, FormsModule, ThyCheckbox]
})
export class ThyRadioToggleInlineExampleComponent implements OnInit {
    public inlineStatus = false;

    constructor() {}

    ngOnInit() {}
}
