import { Component, OnInit } from '@angular/core';
import { ThyResult } from 'ngx-tethys/result';

@Component({
    selector: 'thy-result-success-example',
    templateUrl: './success.component.html',
    imports: [ThyResult]
})
export class ThyResultSuccessExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
