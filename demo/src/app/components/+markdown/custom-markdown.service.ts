import { Injectable } from '@angular/core';
import { ThyMarkdownParserService, EmojisRenderInfo } from '../../../../../src/markdown';

@Injectable()
export class CustomMarkdownParserService extends ThyMarkdownParserService {
    getEmojisRender(): EmojisRenderInfo {
        return null;
    }
}
