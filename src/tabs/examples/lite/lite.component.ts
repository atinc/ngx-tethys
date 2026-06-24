import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyTabs, ThyTab } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-lite-example',
    templateUrl: './lite.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsLiteExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
