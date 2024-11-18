import { InjectionToken } from '@angular/core';
import { ThyI18nLocale } from './i18n';

// Support configure the default locale id
export const THY_I18N_LOCALE_ID = new InjectionToken<string>('thy-i18n-locale-id');

// Support rewrite zh-CN language package
export const THY_I18N_ZH_CN = new InjectionToken<ThyI18nLocale>('thy-i18n-zh-cn');

// Support rewrite es-US language package
export const THY_I18N_EN_US = new InjectionToken<ThyI18nLocale>('thy-i18n-en-us');
