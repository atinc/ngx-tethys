import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyBadge } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-badge-special-example',
    templateUrl: 'special.component.html',
    styleUrls: ['./special.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyBadge]
})
export class ThyBadgeSpecialExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
