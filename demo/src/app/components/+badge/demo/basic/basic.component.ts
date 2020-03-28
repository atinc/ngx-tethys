import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'demo-badge-basic',
    templateUrl: 'basic.component.html'
})
export class DemoBadgeBasicComponent implements OnInit {
    badgeCount = 0;

    constructor() {}

    ngOnInit() {}
}
