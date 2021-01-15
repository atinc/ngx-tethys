import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { GuiderDrawHighlightService } from './guider-highlight-draw';
import { GuiderRef } from './guider-ref';
import { GuiderOptionInfo } from './guider.class';

@Injectable({
    providedIn: 'root'
})
export class ThyGuider {
    constructor(@Inject(DOCUMENT) private document: any, private highlightDraw: GuiderDrawHighlightService) {}

    public create(option: GuiderOptionInfo): GuiderRef {
        return new GuiderRef(option, this.highlightDraw);
    }
}
