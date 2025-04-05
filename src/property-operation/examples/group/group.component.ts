import { Component, OnInit } from '@angular/core';
import { ThyPropertyOperation, ThyPropertyOperationGroup } from 'ngx-tethys/property-operation';

@Component({
    selector: 'thy-property-operation-group-example',
    templateUrl: './group.component.html',
    imports: [ThyPropertyOperation, ThyPropertyOperationGroup]
})
export class ThyPropertyOperationGroupExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
