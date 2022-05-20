import { Component } from '@angular/core';

@Component({
    selector: 'thy-image-group-example',
    templateUrl: './group.component.html'
})
export class ThyImageGroupExampleComponent {
    images = [
        {
            src: 'http://atlas-test.pingcode.live/files/public/6284c3e7d2f0dc84ec6d5159/origin-url',
            imageMeta: {
                name: 'first.jpg',
                size: '66kb'
            },
            origin: {
                src: 'http://atlas-test.pingcode.live/files/public/6284c3e7d2f0dc84ec6d5159/origin-url'
            }
        },
        {
            src: 'http://atlas-test.pingcode.live/files/public/6284c3fad2f0dc84ec6d515b/origin-url',
            imageMeta: {
                name: 'last.jpg',
                size: '44kb'
            },
            origin: {
                src: 'http://atlas-test.pingcode.live/files/public/6284c3fad2f0dc84ec6d515b/origin-url'
            }
        },
        {
            src: 'assets/images/image/last.png',
            imageMeta: {
                name: 'last.jpg',
                size: '44kb'
            },
            origin: {
                src: 'assets/images/image/last.png'
            }
        }
    ];
}
