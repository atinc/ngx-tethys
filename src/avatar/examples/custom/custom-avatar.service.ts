import { Injectable, inject } from '@angular/core';
import { ThyAvatarService } from 'ngx-tethys/avatar';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class CustomAvatarService extends ThyAvatarService {
    private domSanitizer = inject(DomSanitizer);

    constructor() {
        super();
    }

    /**
     * @deprecated the avatarSrcTransform method will be deprecated, please use srcTransform.
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
