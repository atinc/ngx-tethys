import { Injectable } from '@angular/core';
import { ThyMarkdownParserService, EmojisRenderInfo } from 'ngx-tethys';

@Injectable()
export class CustomMarkdownParserService extends ThyMarkdownParserService {
    getEmojisRender(): EmojisRenderInfo {
        return null;
    }
}
