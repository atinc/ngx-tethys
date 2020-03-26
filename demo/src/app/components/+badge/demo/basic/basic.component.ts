import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-badge-basic',
    templateUrl: 'basic.component.html',
    styleUrls: ['./basic.scss']
})
export class DemoBadgeBasicComponent implements OnInit {
    badgeCount = 0;

    constructor() {}

    ngOnInit() {
        setInterval(() => {
            this.badgeCount = Math.floor(Math.random() * 10);
        }, 2000);
    }
}
