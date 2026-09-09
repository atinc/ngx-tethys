import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-avatar-disabled-example',
    templateUrl: './disabled.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAvatar]
})
export class ThyAvatarDisabledExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';
}
