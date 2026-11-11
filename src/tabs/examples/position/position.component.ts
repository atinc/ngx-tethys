import { Component, OnInit } from '@angular/core';
import { ThyTab, ThyTabs, ThyTabsPosition } from 'ngx-tethys/tabs';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { NgClass } from '@angular/common';

@Component({
    selector: 'thy-tabs-position-example',
    templateUrl: './position.component.html',
    imports: [ThyTabs, ThyTab, ThyButtonGroup, NgClass, ThyButton]
})
export class ThyTabsPositionExampleComponent implements OnInit {
    public position: ThyTabsPosition = 'top';

    constructor() {}

    ngOnInit(): void {}
}
