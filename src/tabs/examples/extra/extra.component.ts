import { Component, OnInit } from '@angular/core';
import { ThyActiveTabInfo, ThyTab, ThyTabActiveEvent, ThyTabs } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-extra-example',
    templateUrl: './extra.component.html',
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsExtraExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    activeTab: ThyActiveTabInfo = 'tab1';

    activeTabChange(event: ThyTabActiveEvent) {
        this.activeTab = event;
    }
}
