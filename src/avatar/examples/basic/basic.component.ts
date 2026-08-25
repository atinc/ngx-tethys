import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-avatar-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAvatar]
})
export class ThyAvatarBasicExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    constructor() {}
}
