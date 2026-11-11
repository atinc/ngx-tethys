import { Component, OnInit } from '@angular/core';
import { ThyResult } from 'ngx-tethys/result';

@Component({
    selector: 'thy-result-error-example',
    templateUrl: './error.component.html',
    imports: [ThyResult]
})
export class ThyResultErrorExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
