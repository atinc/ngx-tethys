import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-custom-example',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.component.scss']
})
export class ThyStatisticCustomExampleComponent implements OnInit {
    constructor() {}

    deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

    ngOnInit() {}
}
