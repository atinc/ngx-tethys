import { Component, OnInit } from '@angular/core';
import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-checkbox-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyCheckbox, FormsModule]
})
export class ThyCheckboxBasicExampleComponent implements OnInit {
    checked = false;

    constructor() {}

    ngOnInit() {}
}
