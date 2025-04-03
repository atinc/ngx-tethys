import { Component, OnInit } from '@angular/core';
import { ThyPropertyItemOperationTrigger } from 'ngx-tethys/property';

@Component({
    selector: 'thy-property-operation-example',
    templateUrl: './operation.component.html',
    styleUrls: ['./operation.component.scss']
})
export class ThyPropertyOperation implements OnInit {
    operationTrigger: ThyPropertyItemOperationTrigger = 'always';

    constructor() {}

    ngOnInit(): void {}
}
