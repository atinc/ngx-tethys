import { Component, OnInit } from '@angular/core';
import { ThyActiveTabInfo, ThyTabChangeEvent } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-active-example',
    templateUrl: './active.component.html'
})
export class ThyTabsActiveExampleComponent implements OnInit {
    public activeTab: string | number = 'tab2';

    constructor() {}

    ngOnInit(): void {}

    activeTabChange(event: string | number) {
        console.log('激活的项:', event);
    }
}
