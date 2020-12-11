import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-popover-body',
    template: '<ng-content></ng-content>',
    exportAs: 'thyPopoverBody'
})
export class ThyPopoverBodyComponent {
    @HostBinding('class.thy-popover-body') isPopoverBody = true;
}
