import { Component } from '@angular/core';
import { ThyAvatarService } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-avatar-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyAvatarBasicExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    constructor() {}
}
