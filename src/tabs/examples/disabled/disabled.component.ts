import { Component, OnInit } from '@angular/core';
import { ThyTabChangeEvent } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-disabled-example',
    templateUrl: './disabled.component.html'
})
export class ThyTabsDisabledExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    activeTabChange(event: string | number) {
        console.log('激活的项:', event);
    }
}
