import { InjectionToken } from '@angular/core';
import { ThyAbstractOverlayConfig, ThyAbstractOverlayOptions } from 'ngx-tethys/core';

export class ThyImagePreviewConfig<TData = unknown> extends ThyAbstractOverlayConfig<TData> {
    closeOnNavigation?: boolean;
    disableClose?: boolean;
    disableKeyboardSelectable?: boolean;
    zoom?: number;
    rotate?: number;
}

export const THY_IMAGE_DEFAULT_PREVIEW_OPTIONS = new InjectionToken<ThyImagePreviewConfig>('thy-image-default-options');

export const THY_IMAGE_DEFAULT_PREVIEW_OPTIONS_PROVIDER = {
    provide: THY_IMAGE_DEFAULT_PREVIEW_OPTIONS,
    useValue: {
        hasBackdrop: true,
        closeOnNavigation: true,
        disableClose: false,
        disableKeyboardSelectable: false,
        restoreFocus: false
    }
};

export const imageAbstractOverlayOptions: ThyAbstractOverlayOptions = {
    name: 'image',
    animationEnabled: true,
    disposeWhenClose: true
};
