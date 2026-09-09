import { Injectable } from '@angular/core';
import { ThyAvatarService } from 'ngx-tethys/avatar';
import { SafeHtml } from '@angular/platform-browser';

@Injectable()
export class CustomAvatarService extends ThyAvatarService {
    constructor() {
        super();
    }

    srcTransform(src: string, size: number): string {
        return `assets/images/${src}`;
    }

    nameTransform(name: string): string | SafeHtml {
        return `New ${name}`;
    }
}
