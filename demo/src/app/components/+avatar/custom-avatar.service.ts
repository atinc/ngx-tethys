import { Injectable } from '@angular/core';
import { ThyAvatarService } from '../../../../../src/public-api';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class CustomAvatarService extends ThyAvatarService {
    constructor(private domSanitizer: DomSanitizer) {
        super();
    }

    avatarSrcTransform(src: string, size: number): string {
        return `https://s3.cn-north-1.amazonaws.com.cn/lcavatar/${src}`;
    }

    avatarNameTransform(name: string) {
        // 来自企业微信团队的成员
        return this.domSanitizer.bypassSecurityTrustHtml(
            `<ww-open-data type="userName" openid="${name}"></ww-open-data>`
        );
    }
}
