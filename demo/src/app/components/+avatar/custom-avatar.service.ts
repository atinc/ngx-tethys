import { Injectable } from '@angular/core';
import { ThyAvatarService } from '../../../../../src';

@Injectable()
export class CustomAvatarService extends ThyAvatarService {

    avatarSrcTransform(src: string): string {
        return `https://s3.cn-north-1.amazonaws.com.cn/lcavatar/${src}`;
    }
}



