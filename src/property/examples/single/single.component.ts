import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { ThyPropertyItem } from 'ngx-tethys/property';

@Component({
    selector: 'thy-property-single-example',
    templateUrl: './single.component.html',
    styleUrl: './single.component.scss',
    imports: [FormsModule, ThyPropertyItem, ThyInputDirective, ThyInputNumber]
})
export class ThyPropertySingleExampleComponent implements OnInit {
    user = {
        name: '张萌',
        age: 24
    };
    constructor() {}

    ngOnInit() {}

    changeEditing(event: any, options?: { inputElement?: HTMLInputElement }) {
        if (options?.inputElement) {
            options.inputElement.focus();
        }
    }
}
