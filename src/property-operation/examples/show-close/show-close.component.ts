import { Component, OnInit } from '@angular/core';
import { ThyPropertyOperation } from 'ngx-tethys/property-operation';

@Component({
    selector: 'thy-property-operation-disabled-example',
    templateUrl: './show-close.component.html',
    imports: [ThyPropertyOperation]
})
export class ThyPropertyOperationShowCloseExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
