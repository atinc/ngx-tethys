import { Component } from '@angular/core';

@Component({
    selector: 'thy-image-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyImageBasicExampleComponent {
    imageMeta = {
        name: 'first.jpg'
    };
}
