import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-rate-count-example',
    templateUrl: './count.component.html',
    standalone: false
})
export class ThyRateCountExampleComponent implements OnInit {
    value = 2;

    constructor() {}

    ngOnInit() {}
}
