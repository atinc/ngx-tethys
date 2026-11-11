import { Component, OnInit } from '@angular/core';
import { ThyTab, ThyTabs } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-pills-example',
    templateUrl: './pills.component.html',
    imports: [ThyTabs, ThyTab]
})
export class ThyTabsPillsExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
