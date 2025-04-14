import { Component, OnInit } from '@angular/core';
import { ThyBadge } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-badge-basic-example',
    templateUrl: 'basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyBadge]
})
export class ThyBadgeBasicExampleComponent implements OnInit {
    badgeCount = 0;

    constructor() {}

    ngOnInit() {}
}
