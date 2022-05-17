import { Component } from '@angular/core';
import { ThyImageService } from 'ngx-tethys/image/image.service';

@Component({
    selector: 'thy-image-service-example',
    templateUrl: './service.component.html'
})
export class ThyImageServiceExampleComponent {
    constructor(private thyImageService: ThyImageService) {}

    onClick(): void {
        const images = [
            {
                src: 'https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg',
                width: '200px',
                height: '200px',
                alt: 'ng-zorro'
            },
            {
                src: 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg',
                width: '200px',
                height: '200px',
                alt: 'angular'
            }
        ];
        this.thyImageService.preview(images);
    }
}
