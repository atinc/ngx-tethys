import { Component, OnInit } from '@angular/core';
import { ThyBadge } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-badge-overflow-example',
    templateUrl: 'overflow.component.html',
    styleUrls: ['./overflow.component.scss'],
    imports: [ThyBadge]
})
export class ThyBadgeOverflowExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
