import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ThyImageDirective } from './image.directive';

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
