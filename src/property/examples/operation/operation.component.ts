import { Component, OnInit } from '@angular/core';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyButtonGroup, ThyButton } from 'ngx-tethys/button';
import { ThyPropertyItem, ThyProperties, ThyPropertyItemOperationTrigger } from 'ngx-tethys/property';
import { CommonModule, NgClass } from '@angular/common';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-property-operation-example',
    templateUrl: './operation.component.html',
    styleUrls: ['./operation.component.scss'],
    imports: [ThyProperties, ThyPropertyItem, ThyDivider, ThyButtonGroup, ThyButton, NgClass, ThyAction, CommonModule, ThyInputDirective]
})
export class ThyPropertyOperationExampleComponent implements OnInit {
    operationTrigger: ThyPropertyItemOperationTrigger = 'always';

    constructor() {}

    ngOnInit(): void {}
}
