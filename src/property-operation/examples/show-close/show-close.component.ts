import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyPropertyOperation } from 'ngx-tethys/property-operation';

@Component({
    selector: 'thy-property-operation-disabled-example',
    templateUrl: './show-close.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyPropertyOperation]
})
export class ThyPropertyOperationShowCloseExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
