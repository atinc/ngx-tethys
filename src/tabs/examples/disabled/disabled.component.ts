import { Component, OnInit } from '@angular/core';
import { ThyTab, ThyTabs } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsDisabledExampleComponent implements OnInit {
    public tabs = [
        { id: 'tab1', title: 'Tab1', content: 'Tab1 Content', disabled: false },
        { id: 'tab2', title: 'Tab2', content: 'Tab2 Content', disabled: true },
        { id: 'tab3', title: 'Tab3', content: 'Tab3 Content', disabled: false }
    ];

    public activeTab = 'tab1';

    constructor() {}

    ngOnInit(): void {}
}
