import { Component } from '@angular/core';

@Component({
    selector: 'app-avatar-remove-example',
    templateUrl: './remove.component.html'
})
export class ThyAvatarRemoveExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    message: string;

    remove(name: string) {
        this.message = `${name} remove successfully.`;

        setTimeout(() => {
            this.message = '';
        }, 2000);
    }
}
