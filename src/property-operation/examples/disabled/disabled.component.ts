import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyPropertyOperation } from 'ngx-tethys/property-operation';
import { ThyButtonIcon } from 'ngx-tethys/button';

@Component({
    selector: 'thy-property-operation-disabled-example',
    templateUrl: './disabled.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyPropertyOperation, ThyButtonIcon]
})
export class ThyPropertyOperationDisabledExampleComponent implements OnInit {
    disabled = true;

    constructor() {}

    ngOnInit() {}
}
