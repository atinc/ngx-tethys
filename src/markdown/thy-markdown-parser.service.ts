import { Injectable } from '@angular/core';

export abstract class ThyMarkdownParserService {
    abstract setEmoJies(): {
        emojis: any[];
        getImageSrc: string;
        className: string;
    };

    abstract filterHTML(html: string): string;

    abstract sanitizeHTML(html: string): string;
}

@Injectable()
export class ThyDefaultMarkdownParserService extends ThyMarkdownParserService {
    setEmoJies(): {
        emojis: any[];
        getImageSrc: string;
        className: string;
    } {
        return null;
    }
    filterHTML(html: string): string {
        return html;
    }

    sanitizeHTML(html: string): string {
        return html;
    }
}

export abstract class ThyMarkdownPlanTextParserService {
    abstract setEmoJies(): {
        emojis: any[];
        getImageSrc: string;
        className: string;
    };

    abstract setHighLightWords(): string[];

    abstract filterHTML(html: string): string;
}

@Injectable()
export class ThyDefaultMarkdownPlanTextParserService extends ThyMarkdownPlanTextParserService {
    setEmoJies(): {
        emojis: any[];
        getImageSrc: string;
        className: string;
    } {
        return null;
    }

    setHighLightWords(): string[] {
        return [];
    }

    filterHTML(html: string): string {
        return html;
    }
}
