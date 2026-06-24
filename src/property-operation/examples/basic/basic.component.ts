import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyButtonIcon } from 'ngx-tethys/button';
import { ThyPropertyOperation } from 'ngx-tethys/property-operation';
import { ThyAvatar } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-property-operation-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyPropertyOperation, ThyButtonIcon, ThyAvatar]
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
