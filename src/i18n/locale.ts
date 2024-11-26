import { computed, inject, Signal } from '@angular/core';
import { ThyModuleType, ThyI18nService, ThyModuleLocaleType, ThyI18nLocale } from './index';

export function injectLocale<K extends ThyModuleType | undefined>(
    key?: K
): Signal<K extends ThyModuleType ? ThyModuleLocaleType<K> : ThyI18nLocale> {
    const i18n = inject(ThyI18nService);
    const allLocale = i18n.getLocale();

    return computed(() => {
        return key && allLocale()?.[key] ? allLocale()[key] : allLocale();
    }) as Signal<K extends ThyModuleType ? ThyModuleLocaleType<K> : ThyI18nLocale>;
}
