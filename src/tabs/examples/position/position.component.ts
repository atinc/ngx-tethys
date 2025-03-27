import { Component, OnInit } from '@angular/core';
import { ThyTabsPosition } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-position-example',
    templateUrl: './position.component.html',
    standalone: false
})
export class ThyTabsPositionExampleComponent implements OnInit {
    public position: ThyTabsPosition = 'top';

    constructor() {}

    ngOnInit(): void {}
}
