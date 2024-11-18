import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { THY_I18N_EN_US, THY_I18N_LOCALE_ID, THY_I18N_ZH_CN, ThyI18nLocale, zhCnLocale, enUsLocale } from '.';

function normalizeLocale(localeId: string): string {
    return localeId?.toLowerCase().replace(/_/g, '-');
}

@Injectable({
    providedIn: 'root'
})
export class ThyI18nService {
    private locales: { [id: string]: ThyI18nLocale } = {
        'zh-cn': inject(THY_I18N_ZH_CN, { optional: true }) || zhCnLocale,
        'en-us': inject(THY_I18N_EN_US, { optional: true }) || enUsLocale
    };

    private defaultLocaleId: string = normalizeLocale(inject(THY_I18N_LOCALE_ID, { optional: true })) || 'zh-cn';

    private locale: WritableSignal<ThyI18nLocale> = signal(this.locales[this.defaultLocaleId]);

    /**
     * 设置语言，支持传入 zh-cn(或zh-CN)、 en-us(或en-US)
     * @param id
     */
    setLocale(id: string) {
        const localeId = normalizeLocale(id);
        this.locale.set(this.locales[localeId] || this.locales[this.defaultLocaleId]);
    }

    /**
     * 获取当前语言
     */
    getLocale(): Signal<ThyI18nLocale> {
        return this.locale;
    }
}
