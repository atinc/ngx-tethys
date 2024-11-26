import { computed, inject, Signal } from '@angular/core';
import { ThyModuleType, ThyI18nService, ThyModuleLocaleType, ThyI18nLocale } from './index';

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
