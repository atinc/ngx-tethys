import { Component } from '@angular/core';

@Component({
    selector: 'thy-avatar-list-example',
    templateUrl: './list.component.html'
})
export class ThyAvatarListExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    constructor() {}

    remove(name: string) {
        console.log(name, 'remove emit');
    }
}
