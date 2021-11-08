import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

export abstract class ThyAvatarService {
    ignoreAvatarSrcPaths = [`default.png`];

    /**
     * @deprecated the avatarSrcTransform method will be deprecated, please use srcTransform.
     */
    abstract avatarSrcTransform(src: string, size: number): string;

    abstract srcTransform(src: string, size: number): string;

    abstract nameTransform(name: string): string | SafeHtml;
}

@Injectable()
export class ThyDefaultAvatarService extends ThyAvatarService {
    /**
     * @deprecated the avatarSrcTransform method will be deprecated, please use srcTransform.
     */
    avatarSrcTransform(src: string, size: number): string {
        return src;
    }

    srcTransform(src: string, size: number): string {
        return src;
    }

    nameTransform(name: string): string | SafeHtml {
        return name;
    }
}
