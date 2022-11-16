import { Component } from '@angular/core';

@Component({
    selector: 'thy-avatar-list-example',
    templateUrl: './list.component.html'
})
export class ThyAvatarListExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';
    message: string;

    constructor() {}

    remove(name: string) {
        this.message = `${name} remove successfully.`;

        setTimeout(() => {
            this.message = '';
        }, 2000);
    }
}
