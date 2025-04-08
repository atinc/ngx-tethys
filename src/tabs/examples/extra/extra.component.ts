import { Component, OnInit } from '@angular/core';
import { ThyActiveTabInfo, ThyTab, ThyTabActiveEvent, ThyTabs } from 'ngx-tethys/tabs';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-tabs-extra-example',
    templateUrl: './extra.component.html',
    imports: [ThyTabs, ThyTab, ThyButton]
})
export class ThyTabsExtraExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    activeTab: ThyActiveTabInfo = 'tab1';

    activeTabChange(event: ThyTabActiveEvent) {
        this.activeTab = event;
    }
}
