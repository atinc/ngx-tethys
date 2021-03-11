import { NgxTethysModule } from 'ngx-tethys';

import { Overlay } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DocgeniTemplateModule } from '@docgeni/template';

import { AppComponent } from './app.component';
import { EXAMPLE_MODULES } from './content/example-modules';
import { DOCGENI_SITE_PROVIDERS } from './content/index';

function thyPopoverDefaultConfigFactory(overlay: Overlay) {
    return {
        scrollStrategy: overlay.scrollStrategies.close()
    };
}

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, DocgeniTemplateModule, RouterModule.forRoot([]), NgxTethysModule, ...EXAMPLE_MODULES],
    providers: [...DOCGENI_SITE_PROVIDERS],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {}
}
