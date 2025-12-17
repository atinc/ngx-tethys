import { Component } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-avatar-remove-example',
    templateUrl: './remove.component.html',
    imports: [ThyAvatar]
})
export class ThyAvatarRemoveExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    message!: string;

    remove(name: string) {
        this.message = `${name} remove successfully.`;

        setTimeout(() => {
            this.message = '';
        }, 2000);
    }
}
