import { Component, OnInit } from '@angular/core';
import { ThyResult } from 'ngx-tethys/result';
import { ThyIcon } from 'ngx-tethys/icon';
@Component({
    selector: 'thy-result-custom-example',
    templateUrl: './custom.component.html',
    imports: [ThyResult, ThyIcon]
})
export class ThyResultCustomExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
