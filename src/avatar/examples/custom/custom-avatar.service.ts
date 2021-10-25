import { Injectable } from '@angular/core';
import { ThyAvatarService } from 'ngx-tethys';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class CustomAvatarService extends ThyAvatarService {
    constructor(private domSanitizer: DomSanitizer) {
        super();
    }

    /**
     * @deprecated the avatarSrcTransform method will deprecated, please use srcTransform.
     */
    avatarSrcTransform(src: string, size: number): string {
        return `assets/images/${src}`;
    }

    srcTransform(src: string, size: number): string {
        return `assets/images/${src}`;
    }

    nameTransform(name: string): string | SafeHtml {
        return `New ${name}`;
    }
}
