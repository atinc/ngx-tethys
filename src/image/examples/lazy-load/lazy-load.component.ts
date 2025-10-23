import { Component } from '@angular/core';
import { ThyImageDirective } from 'ngx-tethys/image';
import { ThyImageLazyLoadOptions, ThyImagePreloadOptions } from '../../image.class';

@Component({
    selector: 'thy-image-lazy-load-example',
    templateUrl: './lazy-load.component.html',
    imports: [ThyImageDirective]
})
export class ThyImageLazyLoadExampleComponent {
    images = [
        { src: 'assets/images/image/first.png', name: 'first.jpg' },
        { src: 'assets/images/image/second.png', name: 'second.jpg' },
        { src: 'assets/images/image/third.png', name: 'third.jpg' },
        { src: 'assets/images/image/fourth.png', name: 'fourth.jpg' },
        { src: 'assets/images/image/fifth.png', name: 'fifth.jpg' }
    ];

    lazyLoadOptions: ThyImageLazyLoadOptions = {
        rootMargin: '50px',
        threshold: 0.1
    };

    preloadOptions: ThyImagePreloadOptions = {
        preloadCount: 2,
        direction: 'both',
        delay: 100
    };
}
