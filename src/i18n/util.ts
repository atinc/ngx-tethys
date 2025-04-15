import { ThyLocaleType } from './i18n';

export function normalizeLocale(localeId: string): ThyLocaleType {
    return localeId?.toLowerCase().replace(/_/g, '-') as ThyLocaleType;
}
