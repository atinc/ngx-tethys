import { Component } from '@angular/core';
import { ThyAvatarService } from '../../../../../../src/public-api';

@Component({
    selector: 'demo-avatar-size-section',
    templateUrl: './avatar-type.component.html'
})
export class DemoAvatarTypeSectionComponent {

    public avatarSrc = 'dfea7c36-5147-4569-8910-829137920172_80x80.png';

    isFullPath = false;

    originalTransform: (src: string, size: number) => string;

    constructor(
        private thyAvatarService: ThyAvatarService
    ) { }

    toggleSrcTransform() {
        this.isFullPath = !this.isFullPath;
        if (this.isFullPath) {
            this.avatarSrc = 'https://s3.cn-north-1.amazonaws.com.cn/lcavatar/dfea7c36-5147-4569-8910-829137920172_80x80.png';
            this.thyAvatarService.avatarSrcTransform = (src: string, size: number) => {
                return src;
            };
        } else {
            this.avatarSrc = '9cb2637b-9f70-4d73-8c1d-24542b6ab4e1_80x80.png';
            this.thyAvatarService.avatarSrcTransform = this.originalTransform;
        }
    }

}
