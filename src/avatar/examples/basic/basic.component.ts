import { Component } from '@angular/core';
import { ThyAvatarService } from 'ngx-tethys';

@Component({
    selector: 'thy-avatar-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyAvatarBasicExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    constructor() {}
}
