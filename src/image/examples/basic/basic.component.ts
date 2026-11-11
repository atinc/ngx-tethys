import { Component } from '@angular/core';
import { ThyImageDirective } from 'ngx-tethys/image';

@Component({
    selector: 'thy-image-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyImageDirective]
})
export class ThyImageBasicExampleComponent {
    imageMeta = {
        name: 'first.jpg'
    };
}
