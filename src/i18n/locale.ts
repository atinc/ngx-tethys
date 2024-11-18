import { computed, inject, Signal } from '@angular/core';
import { ThyComponentKeyType, ThyI18nLocale, ThyI18nService } from './index';
import { SafeAny } from 'ngx-tethys/types';

export function useLocale(): Signal<ThyI18nLocale> {
    const i18n = inject(ThyI18nService);
    return i18n.getLocale();
}

export function injectLocale(key: ThyComponentKeyType): Signal<SafeAny> {
    const i18n = inject(ThyI18nService);
    const allLocale = i18n.getLocale();

    return computed(() => {
        return allLocale()?.[key] || {};
    });
}
