import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-avatar-size-example',
    templateUrl: './size.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAvatar]
})
export class ThyAvatarSizeExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    sizes!: ['xs', 'sm', 'md', 'lg'];
}
