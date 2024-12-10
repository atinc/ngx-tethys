import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-property-operation-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
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
