import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
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
    images: ThyImageDirective[] = [];

    addImage(image: ThyImageDirective): void {
        this.images.push(image);
    }
}
