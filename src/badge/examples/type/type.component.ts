import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyBadge } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-badge-type-example',
    templateUrl: 'type.component.html',
    styleUrls: ['./type.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyBadge]
})
export class ThyBadgeTypeExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
