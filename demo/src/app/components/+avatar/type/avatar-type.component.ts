import { Component } from '@angular/core';
import { ThyAvatarService } from '../../../../../../src/public-api';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'demo-avatar-size-section',
    templateUrl: './avatar-type.component.html'
})
export class DemoAvatarTypeSectionComponent {
    public avatarSrc = 'dfea7c36-5147-4569-8910-829137920172_80x80.png';

    isFullPath = false;

    isFromQywx = false;

    originalTransform: (src: string, size: number) => string;

    constructor(private thyAvatarService: ThyAvatarService, private domSanitizer: DomSanitizer) {}

    toggleSrcTransform() {
        this.isFullPath = !this.isFullPath;
        if (this.isFullPath) {
            this.avatarSrc =
                'https://s3.cn-north-1.amazonaws.com.cn/lcavatar/dfea7c36-5147-4569-8910-829137920172_80x80.png';
            this.thyAvatarService.avatarSrcTransform = (src: string, size: number) => {
                return src;
            };
        } else {
            this.avatarSrc = '9cb2637b-9f70-4d73-8c1d-24542b6ab4e1_80x80.png';
            this.thyAvatarService.avatarSrcTransform = this.originalTransform;
        }
    }

    toggleNameTransform() {
        this.isFromQywx = !this.isFromQywx;
        if (this.isFromQywx) {
            this.thyAvatarService.avatarNameTransform = (name: string) => {
                // 来自企业微信团队的成员
                return this.domSanitizer.bypassSecurityTrustHtml(
                    `<ww-open-data type="userName" openid="${name}"></ww-open-data>`
                );
            };
            console.log(`<ww-open-data type="userName" openid="${name}"></ww-open-data>`);
        } else {
            this.thyAvatarService.avatarNameTransform = (name: string) => {
                return name;
            };
        }
    }
}
