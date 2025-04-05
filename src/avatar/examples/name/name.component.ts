import { Component, OnInit } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-avatar-name-example',
    templateUrl: './name.component.html',
    imports: [ThyAvatar]
})
export class ThyAvatarNameExampleComponent implements OnInit {
    avatarSrc = 'assets/images/one-avatar.jpg';

    constructor() {}

    ngOnInit() {}
}
