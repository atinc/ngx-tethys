import { Component, HostBinding } from '@angular/core';

/**
 * @name thy-property-operation-group
 */
@Component({
    selector: 'thy-property-operation-group',
    templateUrl: './property-operation-group.component.html',
    standalone: true
})
export class ThyPropertyOperationGroup {
    @HostBinding('class.thy-property-operation-group') _isPropertyOperationGroup = true;

    constructor() {}
}
