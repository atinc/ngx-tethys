import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import {
    THY_I18N_LOCALE_ID,
    THY_I18N_ZH_HANS,
    THY_I18N_ZH_HANT,
    THY_I18N_EN_US,
    THY_I18N_JA_JP,
    THY_I18N_DE_DE,
    ThyI18nLocale,
    ThyLocaleType,
    zhHansLocale,
    zhHantLocale,
    enUsLocale,
    jaJpLocale,
    deDeLocale
} from './index';

function normalizeLocale(localeId: string): ThyLocaleType {
    return localeId?.toLowerCase().replace(/_/g, '-') as ThyLocaleType;
}

@Injectable({
    providedIn: 'root'
})
export class ThyI18nService {
    private locales: { [key in ThyLocaleType]: ThyI18nLocale } = {
        [ThyLocaleType.zhHans]: inject(THY_I18N_ZH_HANS, { optional: true }) || zhHansLocale,
        [ThyLocaleType.zhHant]: inject(THY_I18N_ZH_HANT, { optional: true }) || zhHantLocale,
        [ThyLocaleType.enUs]: inject(THY_I18N_EN_US, { optional: true }) || enUsLocale,
        [ThyLocaleType.jaJp]: inject(THY_I18N_JA_JP, { optional: true }) || jaJpLocale,
        [ThyLocaleType.deDe]: inject(THY_I18N_DE_DE, { optional: true }) || deDeLocale
    };

    private defaultLocaleId: ThyLocaleType = normalizeLocale(inject(THY_I18N_LOCALE_ID, { optional: true })) || ThyLocaleType.zhHans;

    private locale: WritableSignal<ThyI18nLocale> = signal(this.locales[this.defaultLocaleId]);

    /**
     * 设置语言
     * @param id
     */
    setLocale(id: string) {
        let localeId: ThyLocaleType = normalizeLocale(id);

        if (localeId.includes('zh') && localeId !== ThyLocaleType.zhHans && localeId !== ThyLocaleType.zhHant) {
            localeId = ThyLocaleType.zhHans;
        }

        this.locale.set(this.locales[localeId] || this.locales[this.defaultLocaleId]);
    }

    /**
     * 获取当前语言
     */
    getLocale(): Signal<ThyI18nLocale> {
        return this.locale;
    }
}
