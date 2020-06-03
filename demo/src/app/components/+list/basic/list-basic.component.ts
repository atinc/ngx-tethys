import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-list-basic',
    templateUrl: './list-basic.component.html'
})
export class DemoListBasicComponent implements OnInit {
    checked4: string;
    constructor() {}

    ngOnInit() {}

    sort(event) {
        const a = event;
    }
}
