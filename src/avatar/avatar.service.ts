import { Injectable } from '@angular/core';

export abstract class ThyAvatarService {
    abstract avatarSrcTransform(src: string): string;
}


@Injectable()
export class ThyDefaultAvatarService extends ThyAvatarService {
    avatarSrcTransform(src: string): string {
        return src;
    }
}
