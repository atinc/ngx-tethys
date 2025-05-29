import { ElementRef, InjectionToken, Injector, InputSignal } from '@angular/core';
import { ThyImageMeta } from './image.class';

export interface IThyImageDirective {
    previewable: boolean;
    thySrc: InputSignal<string>;
    thyPreviewSrc: InputSignal<string>;
    thyOriginSrc: InputSignal<string>;
    thyImageMeta: InputSignal<ThyImageMeta>;
}

export interface IThyImageGroupComponent {
    injector: Injector;
    element: ElementRef;
    images: IThyImageDirective[];
    addImage: (image: IThyImageDirective, index: number) => void;
    removeImage: (index: number) => void;
}

export const THY_IMAGE_GROUP_COMPONENT = new InjectionToken<IThyImageGroupComponent>('THY_IMAGE_GROUP_COMPONENT');
