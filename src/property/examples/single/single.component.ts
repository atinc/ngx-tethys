import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyProperties, ThyPropertyItem } from 'ngx-tethys/property';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyAction } from 'ngx-tethys/action';
import { ThyInputNumber } from 'ngx-tethys/input-number';

@Component({
    selector: 'thy-property-single-example',
    templateUrl: './single.component.html',
    styleUrl: './single.component.scss',
    imports: [FormsModule, ThyPropertyItem, ThyTag, ThyAvatar, ThyInputDirective, ThyInputNumber, ThyAction]
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
