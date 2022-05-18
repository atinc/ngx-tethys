import { Component } from '@angular/core';

@Component({
    selector: 'thy-image-group-example',
    templateUrl: './group.component.html'
})
export class ThyImageGroupExampleComponent {
    images = [
        {
            src: 'assets/images/image/first.png',
            imageMeta: {
                name: 'first.png',
                size: '66kb'
            }
        },
        {
            src: 'assets/images/image/second.png',
            imageMeta: {
                name: 'second.jpg',
                size: '44kb'
            }
        },
        {
            src: 'assets/images/image/last.png',
            imageMeta: {
                name: 'last.jpg',
                size: '44kb'
            }
        }
    ];
}
