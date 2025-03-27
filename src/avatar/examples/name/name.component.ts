import { Component, OnInit } from '@angular/core';
import { ThyAvatarService } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-avatar-name-example',
    templateUrl: './name.component.html',
    standalone: false
})
export class ThyAvatarNameExampleComponent implements OnInit {
    avatarSrc = 'assets/images/one-avatar.jpg';

    constructor() {}

    ngOnInit() {}
}
