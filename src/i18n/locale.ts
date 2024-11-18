import { inject, signal, Signal } from '@angular/core';
import { ThyComponentKeyType, ThyI18nLocale, ThyI18nService } from '.';
import { SafeAny } from 'ngx-tethys/types';

export function useLocale(): Signal<ThyI18nLocale> {
    return signal(inject(ThyI18nService).getLocale());
}

export function injectLocale(key: ThyComponentKeyType): Signal<SafeAny> {
    return signal(inject(ThyI18nService).getLocale()?.[key] || {});
}
