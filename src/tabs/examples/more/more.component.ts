import { Component, OnInit } from '@angular/core';
import { ThyTabs, ThyTab } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-more-example',
    templateUrl: './more.component.html',
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsMoreExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
