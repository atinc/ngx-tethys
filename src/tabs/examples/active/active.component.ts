import { Component, OnInit } from '@angular/core';
import { ThyActiveTabInfo, ThyTabChangeEvent } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-active-example',
    templateUrl: './active.component.html'
})
export class ThyTabsActiveExampleComponent implements OnInit {
    public activeTab: ThyActiveTabInfo = {
        id: 'tab2',
        index: 1
    };

    constructor() {}

    ngOnInit(): void {}

    activeTabChange(event: ThyTabChangeEvent) {
        console.log('激活的项:', event);
    }
}
