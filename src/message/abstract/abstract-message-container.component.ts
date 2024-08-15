import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Directive, ElementRef, HostBinding } from '@angular/core';
import { ThyGlobalMessageConfig } from '../message.config';

/**
 * @internal
 */
@Directive()
export class ThyAbstractMessageContainerComponent {
    @HostBinding('style.top') offset: string;

    constructor(
        private elementRef: ElementRef,
        defaultConfig: ThyGlobalMessageConfig
    ) {
        this.offset = coerceCssPixelValue(defaultConfig.offset);
    }

    toOverlayTop() {
        const globalOverlayWrapper = this.elementRef.nativeElement.closest('.cdk-global-overlay-wrapper');
        const overlayContainer = globalOverlayWrapper.parentElement;
        overlayContainer.appendChild(globalOverlayWrapper);
    }
}
