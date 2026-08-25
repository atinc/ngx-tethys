import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyActiveTabInfo, ThyTab, ThyTabs } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-extra-example',
    templateUrl: './extra.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTabs, ThyTab, ThyButton]
})
export class ThyTabsExtraExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    activeTab: ThyActiveTabInfo = 'tab1';
}
