import { Component, OnInit } from '@angular/core';
import { ThyPropertyOperation } from 'ngx-tethys/property-operation';

@Component({
    selector: 'thy-property-operation-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyPropertyOperation]
})
export class ThyPropertyOperationDisabledExampleComponent implements OnInit {
    disabled = true;

    constructor() {}

    ngOnInit() {}
}
