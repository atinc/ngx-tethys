import { inject } from '@angular/core';
import { ThyI18nService } from './i18n.service';

export function useLocale() {
    const i18n = inject(ThyI18nService);
    return i18n.locale;
}
