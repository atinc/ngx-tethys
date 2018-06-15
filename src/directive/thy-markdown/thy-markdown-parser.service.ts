import { Injectable } from '@angular/core';

export abstract class ThyMarkdownParserService {

    abstract setEmoJies(): {
        emojis: any[],
        getImageSrc: string,
        className: string
    };

    abstract filterHTML(html: string): string;
}


@Injectable()
export class ThyDefaultMarkdownParserService extends ThyMarkdownParserService {
    setEmoJies(): {
        emojis: any[],
        getImageSrc: string,
        className: string
    } {
        return null;
    }
    filterHTML(html: string): string {
        return html;
    }
}
