import { Component, OnInit } from '@angular/core';
import { ThyActiveTabInfo, ThyTabActiveEvent } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-extra-example',
    templateUrl: './extra.component.html'
})
export class ThyTabsExtraExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    activeTab: ThyActiveTabInfo = 'tab1';

    activeTabChange(event: ThyTabActiveEvent) {
        this.activeTab = event;
    }
}
