import { Component, ElementRef, HostBinding, inject } from '@angular/core';
import { ThyEmpty } from 'ngx-tethys/empty';

@Component({
    selector: 'thy-empty-container-example',
    templateUrl: './container.component.html',
    imports: [ThyEmpty]
})
export class ThyEmptyContainerExampleComponent {
    elementRef = inject(ElementRef);

    @HostBinding('style') overflow = { height: '300px', display: 'block', overflow: 'hidden' };
}
