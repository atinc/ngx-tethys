import { Component, OnInit } from '@angular/core';
import { ThyTabs, ThyTab } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-lite-example',
    templateUrl: './lite.component.html',
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsLiteExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
