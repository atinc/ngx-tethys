import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-property-operation-group',
    templateUrl: './property-operation-group.component.html'
})
export class ThyPropertyOperationGroupComponent {
    @HostBinding('class.thy-property-operation-group') _isPropertyOperationGroup = true;

    constructor() {}
}
