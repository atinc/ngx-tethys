import { Component } from '@angular/core';

@Component({
    selector: 'thy-avatar-size-example',
    templateUrl: './size.component.html',
    standalone: false
})
export class ThyAvatarSizeExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    sizes: ['xs', 'sm', 'md', 'lg'];
}
