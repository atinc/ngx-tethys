import { Component, OnInit } from '@angular/core';
import { ThyTabChangeEvent } from 'ngx-tethys/tabs';

@Component({
    selector: 'thy-tabs-pills-example',
    templateUrl: './pills.component.html'
})
export class ThyTabsPillsExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    activeTabChange(event: string | number) {
        console.log('激活的项:', event);
    }
}
