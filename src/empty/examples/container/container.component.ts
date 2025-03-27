import { Component, ElementRef, HostBinding, inject } from '@angular/core';

@Component({
    selector: 'thy-empty-container-example',
    templateUrl: './container.component.html',
    standalone: false
})
export class ThyEmptyContainerExampleComponent {
    elementRef = inject(ElementRef);

    @HostBinding('style') overflow = { height: '300px', display: 'block', overflow: 'hidden' };
}
