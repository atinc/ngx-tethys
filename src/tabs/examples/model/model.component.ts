import { Component, OnInit } from '@angular/core';
import { ThyActiveTabInfo, ThyTabActiveEvent, ThyTabs, ThyTab } from 'ngx-tethys/tabs';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-tabs-controlled-example',
    templateUrl: './model.component.html',
    imports: [ThyTabs, ThyTab, ThyButton,ThySpace, ThySpaceItemDirective]
})
export class ThyTabsControlledExampleComponent implements OnInit {
    public activeTab: ThyActiveTabInfo = 'tab2';

    constructor() {}

    ngOnInit(): void {}

    initTabActive() {
        this.activeTab = 'tab1';
    }

    handleClick(val: string) {
        this.activeTab = val;
    }

    activeTabChange(event: ThyTabActiveEvent) {
        console.log('激活的项:', event);
    }
}
