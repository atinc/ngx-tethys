import { InjectionToken, makeEnvironmentProviders, EnvironmentProviders } from '@angular/core';

export const THY_I18N_LOCALE_KEY = new InjectionToken<string>('thy-i18n-locale-key');

// Support static configuration of default language
export function provideThyI18n(config: string): EnvironmentProviders {
    return makeEnvironmentProviders([{ provide: THY_I18N_LOCALE_KEY, useValue: config }]);
}
