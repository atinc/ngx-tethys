import { Injectable } from '@angular/core';

export abstract class ThyAvatarService {

    ignoreAvatarSrcPaths = [`default.png`];

    abstract avatarSrcTransform(src: string, size: number): string;
}


@Injectable()
export class ThyDefaultAvatarService extends ThyAvatarService {
    avatarSrcTransform(src: string, size: number): string {
        return src;
    }
}
