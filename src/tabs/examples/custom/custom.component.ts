import { Component, OnInit } from '@angular/core';
import { ThyTabs, ThyTab } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-custom-example',
    templateUrl: './custom.component.html',
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsCustomExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
