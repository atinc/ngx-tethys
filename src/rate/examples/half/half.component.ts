import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-rate-half-example',
    templateUrl: './half.component.html',
    standalone: false
})
export class ThyRateHalfExampleComponent implements OnInit {
    value = 3.5;

    constructor() {}

    ngOnInit() {}
}
