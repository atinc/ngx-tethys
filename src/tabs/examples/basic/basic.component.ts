import { Component, OnInit } from '@angular/core';
import { ThyTab, ThyTabs } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsBasicExampleComponent implements OnInit {
    constructor() {}

    public tabs = [
        { id: 'tab1', title: 'Tab1', content: 'Tab1 Content' },
        { id: 'tab2', title: 'Tab2', content: 'Tab2 Content' },
        { id: 'tab3', title: 'Tab3', content: 'Tab3 Content' }
    ];

    public activeTab = 'tab1';

    ngOnInit(): void {}

    activeTabChange(event: any) {
        console.log('激活的项：', event);
    }
}
