import { Component, OnInit } from '@angular/core';
import { ThyProperties, ThyPropertyItem } from 'ngx-tethys/property';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyInputDirective } from 'ngx-tethys/input';

@Component({
    selector: 'thy-property-vertical-example',
    templateUrl: './vertical.component.html',
    imports: [ThyProperties, ThyPropertyItem, ThyTag, ThyAvatar, ThyInputDirective]
})
export class ThyPropertyVerticalExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
