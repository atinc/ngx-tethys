import { Component, OnInit } from '@angular/core';
import { ThyTabChangeEvent } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyTabsBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    activeTabChange(event: ThyTabChangeEvent) {
        console.log('激活的项:', event);
    }
}
