import { Injectable } from '@angular/core';
import { ThyAvatarService } from '../../../../../src/public-api';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class CustomAvatarService extends ThyAvatarService {
    constructor(private domSanitizer: DomSanitizer) {
        super();
    }

    avatarSrcTransform(src: string, size: number): string {
        return `https://s3.cn-north-1.amazonaws.com.cn/lcavatar/${src}`;
    }

    nameTransform(name: string): string | SafeHtml {
        return name;
    }
}
