import { Component, OnInit } from '@angular/core';
import { ThyActiveTabInfo, ThyTabActiveEvent } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-active-example',
    templateUrl: './active.component.html',
    standalone: false
})
export class ThyTabsActiveExampleComponent implements OnInit {
    public activeTab: ThyActiveTabInfo = 'tab2';

    constructor() {}

    ngOnInit(): void {}

    activeTabChange(event: ThyTabActiveEvent) {
        console.log('激活的项:', event);
    }
}
