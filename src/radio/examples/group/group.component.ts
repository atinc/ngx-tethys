import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRadio, ThyRadioGroup } from 'ngx-tethys/radio';

@Component({
    selector: 'app-radio-group-example',
    templateUrl: './group.component.html',
    imports: [ThyRadioGroup, FormsModule, ThyRadio]
})
export class ThyRadioGroupExampleComponent implements OnInit {
    public checkedValue = 1;

    constructor() {}

    ngOnInit() {}
}
