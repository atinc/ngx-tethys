import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export interface EmojisRenderInfo {
    emojis: any[];
    getImageSrc: (emoji: string) => string;
    className: string;
}

@Injectable()
export class ThyMarkdownParserService {
    constructor(protected sanitizer: DomSanitizer) {}

    getEmojisRender(): EmojisRenderInfo {
        return null;
    }

    setHighLightWords(): string[] {
        return [];
    }

    filterHTML(html: string) {
        return html;
    }

    sanitizeHTML(html: string) {
        return this.sanitizer.sanitize(SecurityContext.HTML, html);
    }
}
