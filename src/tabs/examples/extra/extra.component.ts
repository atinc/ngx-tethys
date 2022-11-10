import { Component, OnInit } from '@angular/core';
import { ThyActiveTabInfo, ThyTabChangeEvent } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-extra-example',
    templateUrl: './extra.component.html'
})
export class ThyTabsExtraExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    activeTab: string | number = 'tab1';

    activeTabChange(event: string | number) {
        this.activeTab = event;
    }
}
