import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

export abstract class ThyAvatarService {
    ignoreAvatarSrcPaths = [`default.png`];

    abstract avatarSrcTransform(src: string, size: number): string;

    abstract avatarNameTransform(name: string): string | SafeHtml;
}

@Injectable()
export class ThyDefaultAvatarService extends ThyAvatarService {
    avatarSrcTransform(src: string, size: number): string {
        return src;
    }

    avatarNameTransform(name: string): string | SafeHtml {
        return name;
    }
}
