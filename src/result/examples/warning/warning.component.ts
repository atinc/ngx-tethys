import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyResult } from 'ngx-tethys/result';

@Component({
    selector: 'thy-result-warning-example',
    templateUrl: './warning.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyResult]
})
export class ThyResultWarningExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
