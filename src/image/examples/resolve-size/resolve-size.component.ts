import { Component } from '@angular/core';
import { ThyImageDirective } from 'ngx-tethys/image';

@Component({
    selector: 'thy-image-resolve-size-example',
    templateUrl: './resolve-size.component.html',
    imports: [ThyImageDirective]
})
export class ThyImageResolveSizeExampleComponent {
    imageMeta = {
        name: 'first.jpg'
    };
}
