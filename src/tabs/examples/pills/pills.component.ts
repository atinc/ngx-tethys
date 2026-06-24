import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyTab, ThyTabs } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-pills-example',
    templateUrl: './pills.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsPillsExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
