import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyProperties, ThyPropertyItem } from 'ngx-tethys/property';
import { ThyTag } from 'ngx-tethys/tag';

@Component({
    selector: 'thy-property-column-example',
    templateUrl: './column.component.html',
    host: {},
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyProperties, ThyPropertyItem, ThyTag]
})
export class ThyPropertyColumnExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
