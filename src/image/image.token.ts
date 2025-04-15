import { ElementRef, InjectionToken, Injector } from '@angular/core';
import { ThyImageMeta } from './image.class';

export interface IThyImageDirective {
    previewable: boolean;
    thySrc: string;
    thyPreviewSrc: string;
    thyOriginSrc: string;
    thyImageMeta: ThyImageMeta;
}

export interface IThyImageGroupComponent {
    injector: Injector;
    element: ElementRef;
    images: IThyImageDirective[];
    addImage: (image: IThyImageDirective, index: number) => void;
    removeImage: (index: number) => void;
}

export const THY_IMAGE_GROUP_COMPONENT = new InjectionToken<IThyImageGroupComponent>('THY_IMAGE_GROUP_COMPONENT');
