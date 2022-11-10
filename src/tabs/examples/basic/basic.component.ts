import { Component, OnInit } from '@angular/core';
import { ThyTabChangeEvent } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyTabsBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    activeTabChange(event: string | number) {
        console.log('激活的项:', event);
    }
}
