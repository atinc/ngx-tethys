import {
    DocgeniTemplateModule,
    CONFIG_TOKEN,
    routes,
    RootComponent,
    initializeDocgeniSite,
    GlobalContext,
    NavigationService,
    PageTitleService,
    CopierService
} from '@docgeni/template';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { config } from './content/config';
import { RouterModule } from '@angular/router';
import { LIB_EXAMPLE_LOADER_PROVIDER } from './content/example-loader';
import './content/navigations.json';
import { AppComponent } from './app.component';
import { NgxTethysModule } from 'ngx-tethys';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, DocgeniTemplateModule, RouterModule.forRoot(routes), NgxTethysModule],
    providers: [
        // GlobalContext,
        // NavigationService,
        // PageTitleService,
        // CopierService,
        { provide: APP_INITIALIZER, useFactory: initializeDocgeniSite, deps: [GlobalContext], multi: true },
        LIB_EXAMPLE_LOADER_PROVIDER,
        {
            provide: CONFIG_TOKEN,
            useValue: config
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {}
}
