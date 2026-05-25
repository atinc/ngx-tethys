import { ApplicationConfig, importProvidersFrom, provideAppInitializer } from '@angular/core';

import { AppModule } from './app.module';
import { initializeApp } from './app.initializer';

export const appConfig: ApplicationConfig = {
    providers: [importProvidersFrom(AppModule), provideAppInitializer(initializeApp)]
};
