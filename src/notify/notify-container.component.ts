import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Component, Inject, ElementRef } from '@angular/core';
import { ThyNotifyQueue } from './notify-queue.service';
import { ThyGlobalNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG } from './notify.config';

@Component({
    selector: 'thy-notify-container',
    templateUrl: './notify-container.component.html',
    host: {
        class: 'thy-notify-container',
        '[attr.role]': `'notify'`
    }
})
export class ThyNotifyContainerComponent {
    offset: string;

    constructor(
        public notifyQueue: ThyNotifyQueue,
        private elementRef: ElementRef,
        @Inject(THY_NOTIFY_DEFAULT_CONFIG) defaultConfig: ThyGlobalNotifyConfig
    ) {
        this.offset = coerceCssPixelValue(defaultConfig.offset);
    }

    toOverlayTop() {
        const globalOverlayWrapper = this.elementRef.nativeElement.closest('.cdk-global-overlay-wrapper');
        const overlayContainer = globalOverlayWrapper.parentElement;
        overlayContainer.appendChild(globalOverlayWrapper);
    }
}
