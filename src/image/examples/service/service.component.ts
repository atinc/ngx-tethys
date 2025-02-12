import { Component, OnInit, inject } from '@angular/core';
import { ThyImagePreviewOperationType } from 'ngx-tethys/image';
import { ThyImageService } from 'ngx-tethys/image/image.service';

@Component({
    selector: 'thy-image-service-example',
    templateUrl: './service.component.html',
    standalone: false
})
export class ThyImageServiceExampleComponent implements OnInit {
    private thyImageService = inject(ThyImageService);

    ngOnInit(): void {
        this.thyImageService.downloadClicked().subscribe(image => {
            console.log(image);
        });
    }

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
        const previewOperations: ThyImagePreviewOperationType[] = [
            'zoom-out',
            'zoom-in',
            'rotate-right',
            'download',
            'copyLink',
            'view-original',
            'full-screen'
        ];
        this.thyImageService.preview(images, {
            zoom: 1.5,
            operations: previewOperations
        });
    }
}
