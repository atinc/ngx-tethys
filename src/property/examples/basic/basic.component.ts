import { Component, OnInit } from '@angular/core';
import { ThyProperties, ThyPropertyItem } from 'ngx-tethys/property';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';

@Component({
    selector: 'thy-property-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    host: {},
    imports: [ThyProperties, ThyPropertyItem, ThyTag, ThyFlexibleText]
})
export class ThyPropertyBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
