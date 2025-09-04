import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThyMeasureTextService {
    context: CanvasRenderingContext2D;

    defaultFontStyle =
        '12px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Helvetica Neue,Noto Sans,Noto Sans CJK SC,Microsoft Yahei,Arial,Hiragino Sans GB,sans-serif';

    constructor() {
        this.initializeCanvas(this.defaultFontStyle);
    }

    initializeCanvas(fontStyle: string) {
        if (!this.context) {
            const canvas = document.createElement('canvas');
            this.context = canvas.getContext('2d');
        }
        this.context.font = fontStyle;
    }

    measureTextWidth(text: string, font?: string) {
        font ? (this.context.font = font) : '';
        return this.context.measureText(text).width;
    }
}
