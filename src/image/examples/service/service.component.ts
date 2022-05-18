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
                src: 'assets/images/image/first.png',
                alt: 'first',
                name: 'first.jpg',
                size: '66kb'
            },
            {
                src: 'assets/images/image/last.png',
                alt: 'last',
                name: 'last.jpg',
                size: '44kb'
            }
        ];
        this.thyImageService.preview(images, { zoom: 0.8 });
    }
}
