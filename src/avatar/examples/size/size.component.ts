import { Component } from '@angular/core';

@Component({
    selector: 'avatar-size-example',
    templateUrl: './size.component.html'
})
export class ThyAvatarSizeExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    sizes: ['xs', 'sm', 'md', 'lg'];
}
