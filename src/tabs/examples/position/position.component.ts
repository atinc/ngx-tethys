import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyTab, ThyTabs, ThyTabsPosition } from 'ngx-tethys/tabs';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { NgClass } from '@angular/common';

@Component({
    selector: 'thy-tabs-position-example',
    templateUrl: './position.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTabs, ThyTab, ThyButtonGroup, NgClass, ThyButton]
})
export class ThyTabsPositionExampleComponent implements OnInit {
    public position: ThyTabsPosition = 'top';

    constructor() {}

    ngOnInit(): void {}
}
