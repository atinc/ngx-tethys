import { computed, inject, Signal } from '@angular/core';
import { ThyModuleType, ThyI18nLocale, ThyI18nService, ThyModuleLocaleType } from './index';

export function useLocale(): Signal<ThyI18nLocale> {
    const i18n = inject(ThyI18nService);
    return i18n.getLocale();
}

export function injectLocale<K extends ThyModuleType>(key: K): Signal<ThyModuleLocaleType<K>> {
    const i18n = inject(ThyI18nService);
    const allLocale = i18n.getLocale();

    return computed(() => {
        return allLocale()?.[key] || {};
    }) as Signal<ThyModuleLocaleType<K>>;
}
