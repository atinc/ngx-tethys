import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-list-drop',
    templateUrl: './list-drop.component.html'
})
export class DemoListDropComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    sort(event) {
        console.log(event);
    }
}
