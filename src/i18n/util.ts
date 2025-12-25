import { ThyLocaleType } from './i18n';

export function normalizeLocale(localeId: string | null): ThyLocaleType {
    return localeId?.toLowerCase().replace(/_/g, '-') as ThyLocaleType;
}

export function getDefaultLocaleId(): ThyLocaleType {
    let defaultLocaleId = ThyLocaleType.zhHans;
    const allLocales = [ThyLocaleType.zhHans, ThyLocaleType.zhHant, ThyLocaleType.enUs, ThyLocaleType.jaJp, ThyLocaleType.deDe];
    if (typeof window !== 'undefined' && window?.navigator?.language) {
        defaultLocaleId = window.navigator?.language?.toLowerCase() as ThyLocaleType;
    }
    return allLocales.includes(normalizeLocale(defaultLocaleId) as ThyLocaleType) ? defaultLocaleId : ThyLocaleType.zhHans;
}
