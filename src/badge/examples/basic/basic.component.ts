import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'thy-badge-basic-example',
    templateUrl: 'basic.component.html',
    styleUrls: ['./basic.component.scss'],
    standalone: false
})
export class ThyBadgeBasicExampleComponent implements OnInit {
    badgeCount = 0;

    constructor() {}

    ngOnInit() {}
}
