import { Injectable } from '@angular/core';
import { ThyMarkdownParserService, ThyMarkdownPlanTextParserService } from '../../../../../src/markdown';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

@Injectable()
export class CustomMarkdownParserService extends ThyMarkdownParserService {
    setEmoJis(): {
        emojis: any[];
        getImageSrc: string;
        className: string;
    } {
        return null;
    }
    filterHTML(html: string): string {
        return html;
    }

    sanitizeHTML(html: string) {
        return html;
    }
}

@Injectable()
export class CustomMarkdownPlanTextParserService extends ThyMarkdownPlanTextParserService {
    setEmoJis(): {
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
        return html;
    }
}
