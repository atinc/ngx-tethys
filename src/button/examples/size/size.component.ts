
import { Component, OnInit } from '@angular/core';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-button-size-example',
    templateUrl: './size.component.html',
    imports: [ThyButton, ThyButtonGroup, ThyIcon, ThySpace, ThySpaceItemDirective]
})
export class ThyButtonSizeExampleComponent implements OnInit {
    sizes = [
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
            value: 'default',
            height: 36
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
