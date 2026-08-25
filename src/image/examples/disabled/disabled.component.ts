import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyImageDirective } from 'ngx-tethys/image';

@Component({
    selector: 'thy-image-disabled-example',
    templateUrl: './disabled.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyImageDirective]
})
export class ThyImageDisabledExampleComponent {
    imageMeta = {
        name: 'first.jpg',
        size: '66kb'
    };
}
