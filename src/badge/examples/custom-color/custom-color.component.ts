import { Component, OnInit } from '@angular/core';
import { ThyBadge } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-badge-custom-color-example',
    templateUrl: 'custom-color.component.html',
    styleUrls: ['./custom-color.component.scss'],
    imports: [ThyBadge]
})
export class ThyBadgeCustomColorExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
