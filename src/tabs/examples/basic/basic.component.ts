import { Component, OnInit } from '@angular/core';
import { ThyTabActiveEvent, ThyTabs, ThyTab } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    activeTabChange(event: ThyTabActiveEvent) {
        console.log('激活的项:', event);
    }
}
