import { Component, OnInit } from '@angular/core';
import { ThyButtonGroup } from 'ngx-tethys/button';
import { ThyTabs, ThyTab } from 'ngx-tethys/tabs';
import { NgClass } from '@angular/common';
@Component({
    selector: 'thy-tabs-size-example',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss'],
    imports: [ThyTabs, ThyTab, ThyButtonGroup, NgClass]
})
export class ThyTabsSizeExampleComponent implements OnInit {
    sizes = [
        {
            value: 'sm',
            height: 44
        },
        {
            value: 'md',
            height: 48
        },
        {
            value: 'lg',
            height: 52
        }
    ];

    size = this.sizes[0].value;

    constructor() {}

    ngOnInit(): void {}
}
