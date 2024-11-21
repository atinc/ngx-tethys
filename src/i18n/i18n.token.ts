import { InjectionToken } from '@angular/core';
import { ThyI18nLocale, ThyLocaleType } from './i18n';

// Support configure the default locale id
export const THY_I18N_LOCALE_ID = new InjectionToken<ThyLocaleType>('thy-i18n-locale-id');

// Support rewrite language package
export const THY_I18N_ZH_HANS = new InjectionToken<ThyI18nLocale>('thy-i18n-zh-hans');
export const THY_I18N_ZH_HANT = new InjectionToken<ThyI18nLocale>('thy-i18n-zh-hant');
export const THY_I18N_EN_US = new InjectionToken<ThyI18nLocale>('thy-i18n-en-us');
export const THY_I18N_JA_JP = new InjectionToken<ThyI18nLocale>('thy-i18n-ja-jp');
export const THY_I18N_DE_DE = new InjectionToken<ThyI18nLocale>('thy-i18n-de-de');
