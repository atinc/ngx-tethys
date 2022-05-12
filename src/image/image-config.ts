import { InjectionToken } from '@angular/core';

export class ThyImageConfig<TData = unknown> {}

export const THY_IMAGE_DEFAULT_OPTIONS = new InjectionToken<ThyImageConfig>('thy-image-default-options');

export const THY_IMAGE_DEFAULT_OPTIONS_PROVIDER = {
    provide: THY_IMAGE_DEFAULT_OPTIONS,
    useValue: {}
};
