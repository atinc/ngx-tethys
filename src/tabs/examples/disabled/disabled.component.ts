import { Component, OnInit } from '@angular/core';
import { ThyTab, ThyTabActiveEvent, ThyTabs } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsDisabledExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    activeTabChange(event: ThyTabActiveEvent) {
        console.log('激活的项:', event);
    }
}
