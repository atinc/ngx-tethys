import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyBadge } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-avatar-has-badge-example',
    templateUrl: './has-badge.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyBadge, ThyAvatar]
})
export class ThyAvatarHasBadgeExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    sizes = ['xs', 'sm', 'md', 'lg'];
}
