import { Component, OnInit } from '@angular/core';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyButtonGroup, ThyButton } from 'ngx-tethys/button';
import { ThyPropertyItem, ThyProperties, ThyPropertyItemOperationTrigger } from 'ngx-tethys/property';
import { NgClass } from '@angular/common';

@Component({
    selector: 'thy-property-operation-example',
    templateUrl: './operation.component.html',
    styleUrls: ['./operation.component.scss'],
    imports: [ThyProperties, ThyPropertyItem, ThyDivider, ThyButtonGroup, ThyButton, NgClass]
})
export class ThyPropertyOperation implements OnInit {
    operationTrigger: ThyPropertyItemOperationTrigger = 'always';

    constructor() {}

    ngOnInit(): void {}
}
