import { Component, OnInit } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { NgClass } from '@angular/common';

@Component({
    selector: 'thy-nav-size-example',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss'],
    imports: [ThyNav, ThyNavItemDirective, ThyButtonGroup, ThyButton, NgClass]
})
export class ThyNavSizeExampleComponent implements OnInit {
    sizes = [
        {
            value: 'sm',
            text: 'sm'
        },
        {
            value: 'md',
            text: 'md'
        },
        {
            value: 'lg',
            text: 'lg'
        }
    ];

    size = this.sizes[1];

    constructor() {}

    ngOnInit(): void {}
}
