import { Component } from '@angular/core';

@Component({
    selector: 'thy-avatar-list-example',
    templateUrl: './list.component.html'
})
export class ThyAvatarListExampleComponent {
    avatarSrc = 'assets/images/one-avatar.jpg';

    names: string[] = [
        'Abigail',
        'Belle',
        'Camilla',
        'Dottie',
        'Elva',
        'Flora',
        'Peter',
        'Chan',
        '王晨媛',
        'Alle',
        'Irene',
        'Kathleen',
        'Leila',
        'LuLu',
        'Mandy',
        'Meg',
        'Nan',
        'Live',
        'Pamela',
        'Rebecca'
    ];

    constructor() {}

    remove(event: Event, name: string) {
        this.names = this.names.filter(item => {
            return item !== name;
        });
    }
}
