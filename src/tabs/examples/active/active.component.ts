import { Component, OnInit } from '@angular/core';
import { ThyActiveTabInfo, ThyTab, ThyTabActiveEvent, ThyTabs } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-active-example',
    templateUrl: './active.component.html',
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsActiveExampleComponent implements OnInit {
    public activeTab: ThyActiveTabInfo = 2;

    public activeTab2: ThyActiveTabInfo = 'tab1';

    constructor() {}

    ngOnInit(): void {}

    activeTabChange(event: ThyTabActiveEvent) {
        console.log('激活的项:', event);
    }
}
