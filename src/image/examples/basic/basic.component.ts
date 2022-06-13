import { Component } from '@angular/core';

@Component({
    selector: 'thy-image-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyImageBasicExampleComponent {
    imageMeta = {
        name: 'first.jpg',
        size: '66kb'
    };
}
