import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-rate-disabled-example',
    templateUrl: './disabled.component.html',
    standalone: false
})
export class ThyRateDisabledExampleComponent implements OnInit {
    value = 2;

    constructor() {}

    ngOnInit() {}
}
