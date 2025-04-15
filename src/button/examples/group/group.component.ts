import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonGroupSize, ThyButton, ThyButtonGroup, ThyButtonIcon } from 'ngx-tethys/button';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-button-group-example',
    templateUrl: './group.component.html',
    imports: [ThyButton, ThyButtonGroup, ThyButtonIcon, NgClass, ThyIcon]
})
export class ThyButtonGroupExampleComponent implements OnInit {
    sizes: { value: ButtonGroupSize; height: number }[] = [
        {
            value: 'xs',
            height: 24
        },
        {
            value: 'sm',
            height: 28
        },
        {
            value: 'md',
            height: 32
        },
        {
            value: 'lg',
            height: 44
        }
    ];

    size = this.sizes[3].value;

    constructor() {}

    ngOnInit() {}
}
