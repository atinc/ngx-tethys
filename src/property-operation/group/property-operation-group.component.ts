import { Component, HostBinding } from '@angular/core';

/**
 * @private
 */
@Component({
    selector: 'thy-property-operation-group',
    templateUrl: './property-operation-group.component.html',
    standalone: true
})
export class ThyPropertyOperationGroupComponent {
    @HostBinding('class.thy-property-operation-group') _isPropertyOperationGroup = true;

    constructor() {}
}
