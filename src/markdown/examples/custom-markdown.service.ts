import { Injectable } from '@angular/core';
import { ThyMarkdownParserService, EmojisRenderInfo } from 'ngx-tethys/markdown';

@Injectable()
export class CustomMarkdownParserService extends ThyMarkdownParserService {
    getEmojisRender(): EmojisRenderInfo {
        return null;
    }
}
