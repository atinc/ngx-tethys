import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCheckbox } from 'ngx-tethys/checkbox';

@Component({
    selector: 'thy-checkbox-inline-example',
    templateUrl: './inline.component.html',
    imports: [ThyCheckbox, FormsModule]
})
export class ThyCheckboxInlineExampleComponent implements OnInit {
    public inlineStatus = true;

    constructor() {}

    ngOnInit() {}
}
