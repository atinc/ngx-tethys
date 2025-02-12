import { Component } from '@angular/core';

@Component({
    selector: 'thy-image-disabled-example',
    templateUrl: './disabled.component.html',
    standalone: false
})
export class ThyImageDisabledExampleComponent {
    imageMeta = {
        name: 'first.jpg',
        size: '66kb'
    };
}
