import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

platformBrowser()
    .bootstrapModule(AppModule, { applicationProviders: [] })
    .catch(err => console.error(err));
