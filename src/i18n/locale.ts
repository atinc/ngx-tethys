import { computed, inject, Signal } from '@angular/core';
import { ThyModuleLocaleType, ThyModuleType, ThyI18nLocale } from './i18n';
import { ThyI18nService } from './i18n.service';

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
