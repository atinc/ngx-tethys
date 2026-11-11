import { Component, signal } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-avatar-remove-example',
    templateUrl: './remove.component.html',
    imports: [ThyAvatar]
})
export class ThyAvatarRemoveExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    message = signal<string>('');

    remove(name: string) {
        this.message.set(`${name} remove successfully.`);

        setTimeout(() => {
            this.message.set('');
        }, 2000);
    }
}
