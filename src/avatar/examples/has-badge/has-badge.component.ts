import { Component } from '@angular/core';

@Component({
    selector: 'thy-avatar-has-badge-example',
    templateUrl: './has-badge.component.html',
    standalone: false
})
export class ThyAvatarHasBadgeExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    sizes = ['xs', 'sm', 'md', 'lg'];
}
