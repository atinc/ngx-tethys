import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyImageDirective } from 'ngx-tethys/image';

@Component({
    selector: 'thy-image-resolve-size-example',
    templateUrl: './resolve-size.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyImageDirective]
})
export class ThyImageResolveSizeExampleComponent {
    imageMeta = {
        name: 'first.jpg'
    };
}
