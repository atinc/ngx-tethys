import { Injectable } from '@angular/core';
import { ThyAvatarService } from '../../../../../src/public-api';

@Injectable()
export class CustomAvatarService extends ThyAvatarService {

    avatarSrcTransform(src: string, size: number): string {
        return `https://s3.cn-north-1.amazonaws.com.cn/lcavatar/${src}`;
    }
}



