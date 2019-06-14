import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThyIconRegistry {
    _defaultFontSetClass = 'wt-icon';

    getDefaultFontSetClass() {
        return this._defaultFontSetClass;
    }

    getFontSetClassByAlias(fontSet: string) {
        return fontSet;
    }
}
