import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyActiveTabValue, ThyTab, ThyTabActiveEvent, ThyTabs } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-active-example',
    templateUrl: './active.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsActiveExampleComponent implements OnInit {
    public activeTab: ThyActiveTabValue = 2;

    public activeTab2: ThyActiveTabValue = 'tab1';

    constructor() {}

    ngOnInit(): void {}

    activeTabChange(event: ThyTabActiveEvent) {
        console.log('激活的项:', event);
    }
}
