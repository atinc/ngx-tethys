import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyBadge } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-badge-no-wrapper-example',
    templateUrl: 'no-wrapper.component.html',
    styleUrls: ['./no-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyBadge]
})
export class ThyBadgeNoWrapperExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
