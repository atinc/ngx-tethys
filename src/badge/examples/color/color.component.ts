import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyBadge } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-badge-color-example',
    templateUrl: 'color.component.html',
    styleUrls: ['./color.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyBadge]
})
export class ThyBadgeColorExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
