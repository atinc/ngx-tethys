import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyBadge } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-badge-basic-example',
    templateUrl: 'basic.component.html',
    styleUrls: ['./basic.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyBadge]
})
export class ThyBadgeBasicExampleComponent implements OnInit {
    badgeCount = 0;

    constructor() {}

    ngOnInit() {}
}
