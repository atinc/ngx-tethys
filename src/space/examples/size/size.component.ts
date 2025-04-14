import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { ThyButtonGroup, ThyButton } from 'ngx-tethys/button';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-space-size-example',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss'],
    host: {},
    imports: [ThyButtonGroup, ThyButton, NgClass, ThySpace, ThySpaceItemDirective]
})
export class ThySpaceSizeExampleComponent implements OnInit {
    sizes = ['zero', 'xxs', 'xs', 'sm', 'md', 'lg', 'xlg', 40];

    size = 'md';

    constructor() {}

    ngOnInit() {}
}
