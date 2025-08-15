import { Directive, ElementRef, HostBinding, inject } from '@angular/core';
import { coerceCssPixelValue } from 'ngx-tethys/util';
import { ThyGlobalMessageConfig } from '../message.config';

/**
 * @internal
 */
@Directive()
export class ThyAbstractMessageContainerComponent {
    private elementRef = inject(ElementRef);

    @HostBinding('style.top') offset: string;

    constructor(defaultConfig: ThyGlobalMessageConfig) {
        this.offset = coerceCssPixelValue(defaultConfig.offset);
    }

    toOverlayTop() {
        const globalOverlayWrapper = this.elementRef.nativeElement.closest('.cdk-global-overlay-wrapper');
        const overlayContainer = globalOverlayWrapper.parentElement;
        overlayContainer.appendChild(globalOverlayWrapper);
    }
}
