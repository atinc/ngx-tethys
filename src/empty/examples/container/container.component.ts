import { Component, ElementRef, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-empty-container-example',
    templateUrl: './container.component.html'
})
export class ThyEmptyContainerExampleComponent {
    @HostBinding('style') overflow = { height: '300px', display: 'block', overflow: 'hidden' };

    constructor(public elementRef: ElementRef) {}
}
