import { computed, inject, Signal } from '@angular/core';
import { normalizeLocale, ThyI18nLocale, ThyI18nService, ThyLocaleType, ThyModuleLocaleType, ThyModuleType } from './index';

export function injectLocale(): Signal<ThyI18nLocale>;

export function injectLocale<K extends ThyModuleType>(key: K): Signal<ThyModuleLocaleType<K>>;

export function injectLocale<K extends ThyModuleType>(key?: K): Signal<ThyI18nLocale | ThyModuleLocaleType<K>> {
    const i18n = inject(ThyI18nService);
    const allLocale = i18n.getLocale();

    return computed(() => {
        if (key) {
            return allLocale()[key] ?? allLocale();
        }
        return allLocale();
    });
}

/**
 * 当前语言是否包含在支持的语言列表中
 * @param locale
 * return boolean
 */
export function isIncludeLocale(locale: string) {
    const allLocales = [ThyLocaleType.zhHans, ThyLocaleType.zhHant, ThyLocaleType.enUs, ThyLocaleType.jaJp, ThyLocaleType.deDe];
    if (!allLocales.includes(normalizeLocale(locale) as ThyLocaleType)) {
        return false;
    }
    return true;
}
