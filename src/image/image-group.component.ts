import { ChangeDetectionStrategy, Component, ViewEncapsulation, Injector, ElementRef } from '@angular/core';
import { ThyImageDirective } from './image.directive';

/**
 * 图片分组，提供 thyImageGroup 指令和 thy-image-group 标签两种使用方式
 *
 */
@Component({
    selector: 'thy-image-group, [thyImageGroup]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThyImageGroupComponent {
    constructor(public injector: Injector, public element: ElementRef) {}

    images: ThyImageDirective[] = [];

    addImage(image: ThyImageDirective, index: number): void {
        this.images.splice(index, 0, image);
    }

    removeImage(index: number) {
        this.images.splice(index, 1);
    }
}
