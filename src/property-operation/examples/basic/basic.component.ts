import { Component, OnInit } from '@angular/core';
import { ThyPropertyOperation } from 'ngx-tethys/property-operation';

@Component({
    selector: 'thy-property-operation-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyPropertyOperation]
})
export class ThyPropertyOperationBasicExampleComponent implements OnInit {
    disabled = false;

    showClose = false;

    labelHideWhenHasValue = false;

    type = '';

    avatarSrc = 'assets/images/one-avatar.jpg';

    constructor() {}

    ngOnInit() {}
}
