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
 * 支持语言列表中获取默认语言
 * return ThyLocaleType
 */
export function getDefaultLocaleId(): ThyLocaleType {
    let defaultLocaleId = ThyLocaleType.zhHans;
    const allLocales = [ThyLocaleType.zhHans, ThyLocaleType.zhHant, ThyLocaleType.enUs, ThyLocaleType.jaJp, ThyLocaleType.deDe];
    if (typeof window !== 'undefined' && window?.navigator?.language) {
        defaultLocaleId = window.navigator?.language?.toLowerCase() as ThyLocaleType;
    }
    return allLocales.includes(normalizeLocale(defaultLocaleId) as ThyLocaleType) ? defaultLocaleId : ThyLocaleType.zhHans;
}
