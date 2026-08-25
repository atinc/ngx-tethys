import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';

@Component({
    selector: 'thy-avatar-name-example',
    templateUrl: './name.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAvatar]
})
export class ThyAvatarNameExampleComponent implements OnInit {
    avatarSrc = 'assets/images/one-avatar.jpg';

    constructor() {}

    ngOnInit() {}
}
