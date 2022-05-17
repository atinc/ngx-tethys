import { Component } from '@angular/core';

@Component({
    selector: 'thy-image-group-example',
    templateUrl: './group.component.html'
})
export class ThyImageGroupExampleComponent {
    images = [
        {
            src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            imageMeta: {
                name: 'first.jpg',
                size: '66kb'
            }
        },
        {
            src: 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg',
            imageMeta: {
                name: 'last.jpg',
                size: '44kb'
            }
        }
    ];
}
