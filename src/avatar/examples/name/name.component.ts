import { Component, OnInit } from '@angular/core';
import { ThyAvatarService } from 'ngx-tethys';

@Component({
    selector: 'thy-avatar-name-example',
    templateUrl: './name.component.html'
})
export class ThyAvatarNameExampleComponent implements OnInit {
    avatarSrc = 'assets/images/one-avatar.jpg';

    constructor() {}

    ngOnInit() {}
}
