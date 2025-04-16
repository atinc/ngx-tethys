import { Component } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-avatar-img-error-example',
    templateUrl: './img-error.component.html',
    imports: [ThyAvatar]
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
