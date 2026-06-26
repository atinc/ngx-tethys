import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyTabs, ThyTab } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-custom-example',
    templateUrl: './custom.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsCustomExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
