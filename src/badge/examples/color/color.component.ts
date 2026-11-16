import { Component, OnInit } from '@angular/core';
import { ThyBadge } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-badge-color-example',
    templateUrl: 'color.component.html',
    styleUrls: ['./color.component.scss'],
    imports: [ThyBadge]
})
export class ThyBadgeColorExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
