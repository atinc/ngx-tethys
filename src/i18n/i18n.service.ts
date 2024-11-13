import { Injectable, inject } from '@angular/core';
import { IndexableObject, SafeAny } from 'ngx-tethys/types';
import { en_US, THY_I18N_LOCALE_KEY, ThyI18nLocale, zh_CN } from '.';

@Injectable({
    providedIn: 'root'
})
export class ThyI18nService {
    constructor() {
        this.setLocale(inject(THY_I18N_LOCALE_KEY, { optional: true }) || 'zh-CN');
    }

    locale: ThyI18nLocale;

    translate(path: string, variablesMap?: SafeAny): string {
        let content = this.getLocaleByPath(this.locale, path) as string;
        if (typeof content === 'string') {
            if (variablesMap) {
                Object.keys(variablesMap).forEach(key => (content = content.replace(new RegExp(`{{ ${key} }}`, 'g'), variablesMap[key])));
            }
            return content;
        }
        return path;
    }

    getLocaleKey(): string {
        return this.locale ? this.locale.key : '';
    }

    setLocale(localeKey: string): void {
        const key = localeKey.toLowerCase();
        const currentLocaleKey = this.getLocaleKey().toLowerCase();

        if (currentLocaleKey === key) {
            return;
        }

        switch (key) {
            case 'zh-ch':
                this.locale = zh_CN;
                break;
            case 'en-us':
                this.locale = en_US;
                break;
            default:
                this.locale = zh_CN;
        }
    }

    private getLocaleByPath(locale: IndexableObject, path: string): string | object | SafeAny {
        let result = locale;
        const paths = path.split('.');
        const depth = paths.length;
        let index = 0;
        while (result && index < depth) {
            result = result[paths[index++]];
        }
        return index === depth ? result : null;
    }
}
