import { Injectable } from '@angular/core';
import { ThyMarkdownParserService, ThyMarkdownPlanTextParserService } from '../../../../../src/markdown';

@Injectable()
export class CustomMarkdownParserService extends ThyMarkdownParserService {
    setEmoJies(): {
        emojis: any[];
        getImageSrc: string;
        className: string;
    } {
        return null;
    }
    filterHTML(html: string): string {
        return html + '-filter';
    }
}

@Injectable()
export class CustomMarkdownPlanTextParserService extends ThyMarkdownPlanTextParserService {
    setEmoJies(): {
        emojis: any[];
        getImageSrc: string;
        className: string;
    } {
        return null;
    }
    setHighLightWords() {
        return [];
    }
    filterHTML(html: string): string {
        return html + '-filter';
    }
}
