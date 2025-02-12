import { Component } from '@angular/core';

@Component({
    selector: 'thy-avatar-img-error-example',
    templateUrl: './img-error.component.html',
    standalone: false
})
export class ThyAvatarImgErrorExampleComponent {
    avatarSrc = './not_exist/abc.jpg';
    avatarSrcEmpty = '';

    constructor() {}

    jackieAvatarError(event: Event) {
        console.log('---> Jackie Avatar Error');
        console.log(event);
    }
}
