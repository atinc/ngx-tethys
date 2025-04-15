import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { SelectControlSize, ThyOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { NgClass } from '@angular/common';

@Component({
    selector: 'thy-select-size-example',
    templateUrl: './size.component.html',
    styles: [
        `
            thy-select {
                width: 400px;
                margin-top: 15px;
            }
        `
    ],
    imports: [ThySelect, ThyOption, FormsModule, ThyButtonGroup, NgClass, ThyButton]
})
export class ThySelectSizeExampleComponent implements OnInit {
    listOfOption = listOfOption;

    listOfSelectedValue = ['option1', 'option2'];

    selectSizes: {
        name: SelectControlSize;
        height: number;
    }[] = [
        {
            name: 'xs',
            height: 24
        },
        {
            name: 'sm',
            height: 28
        },
        {
            name: 'md',
            height: 32
        },
        {
            name: '',
            height: 36
        },
        {
            name: 'lg',
            height: 44
        }
    ];

    currentSize = this.selectSizes[3];

    ngOnInit() {}
}
