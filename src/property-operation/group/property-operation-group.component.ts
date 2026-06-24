import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

/**
 * @name thy-property-operation-group
 */
@Component({
    selector: 'thy-property-operation-group',
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './property-operation-group.component.html'
})
export class ThyPropertyOperationGroup {
    @HostBinding('class.thy-property-operation-group') _isPropertyOperationGroup = true;

    constructor() {}
}
