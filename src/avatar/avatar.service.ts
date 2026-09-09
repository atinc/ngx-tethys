import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

export abstract class ThyAvatarService {
    ignoreAvatarSrcPaths = [`default.png`];

    abstract srcTransform(src: string, size: number): string;

    abstract nameTransform(name: string): string | SafeHtml;
}

@Injectable()
export class ThyDefaultAvatarService extends ThyAvatarService {
    srcTransform(src: string, size: number): string {
        return src;
    }

    nameTransform(name: string): string | SafeHtml {
        return name;
    }
}
