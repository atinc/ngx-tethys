import { Component, OnInit } from '@angular/core';
import { ThyProperties, ThyPropertyItem } from 'ngx-tethys/property';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyAvatar } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-property-vertical-example',
    templateUrl: './vertical.component.html',
    imports: [ThyProperties, ThyPropertyItem, ThyTag, ThyAvatar]
})
export class ThyPropertyVerticalExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
