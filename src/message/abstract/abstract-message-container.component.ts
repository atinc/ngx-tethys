import { Directive, ElementRef, HostBinding, inject } from '@angular/core';
import { coerceCssPixelValue } from 'ngx-tethys/util';
import { ThyGlobalMessageConfig } from '../message.config';

/**
 * @internal
 */
@Directive()
export abstract class ThyAbstractMessageContainerComponent {
    private elementRef = inject(ElementRef);

    @HostBinding('style.top')
    get offset(): string {
        return coerceCssPixelValue(this.defaultConfig.offset);
    }

    public abstract defaultConfig: ThyGlobalMessageConfig;

    toOverlayTop() {
        const globalOverlayWrapper = this.elementRef.nativeElement.closest('.cdk-global-overlay-wrapper');
        const overlayContainer = globalOverlayWrapper.parentElement;
        overlayContainer.appendChild(globalOverlayWrapper);
    }
}
