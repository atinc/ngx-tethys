import { Component } from '@angular/core';
import { ThyImageDirective, ThyImageGroup } from 'ngx-tethys/image';

@Component({
    selector: 'thy-image-group-example',
    templateUrl: './group.component.html',
    imports: [ThyImageDirective, ThyImageGroup]
})
export class ThyImageGroupExampleComponent {
    images = [
        {
            src: 'assets/images/image/first.png',
            imageMeta: {
                name: 'first.jpg'
            },
            origin: {
                src: 'assets/images/image/first.png'
            }
        },
        {
            src: 'assets/images/image/second.png',
            imageMeta: {
                name: 'last.jpg'
            },
            origin: {
                src: 'assets/images/image/second.png'
            }
        },
        {
            src: 'assets/images/image/last.png',
            imageMeta: {
                name: 'last.jpg'
            },
            origin: {
                src: 'assets/images/image/last.png'
            }
        }
    ];
}
