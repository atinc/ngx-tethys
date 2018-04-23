import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-empty',
    templateUrl: './empty.component.html'
})
export class ThyEmptyComponent {

    iconClass: string;

    displayText: string;

    @HostBinding('class.empty-state') emptyStateClass = true;

}
