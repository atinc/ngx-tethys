import { Injectable } from '@angular/core';
import { ThyMarkdownParserService } from '../../../../../src/directive';

@Injectable()
export class CustomEditorService extends ThyMarkdownParserService {
    setEmoJies(): {
        emojis: any[],
        getImageSrc: string,
        className: string
    } {
        return null;
    }
    filterHTML(html: string): string {
        return html + '--filter--';
    }

}



