import { NgxTethysModule } from 'ngx-tethys';

import { Overlay } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DocgeniTemplateModule, RootComponent } from '@docgeni/template';

import { ThyIconRegistry } from '../../../src/icon/icon-registry';
import { EXAMPLE_MODULES } from './content/example-modules';
import { DOCGENI_SITE_PROVIDERS } from './content/index';

function thyPopoverDefaultConfigFactory(overlay: Overlay) {
    return {
        scrollStrategy: overlay.scrollStrategies.close()
    };
}

@NgModule({
    declarations: [],
    imports: [BrowserModule, BrowserAnimationsModule, DocgeniTemplateModule, RouterModule.forRoot([]), NgxTethysModule, ...EXAMPLE_MODULES],
    providers: [...DOCGENI_SITE_PROVIDERS],
    bootstrap: [RootComponent]
})
export class AppModule {
    constructor(iconRegistry: ThyIconRegistry, sanitizer: DomSanitizer) {
        const iconSvgUrl = `assets/icons/defs/svg/sprite.defs.svg`;
        iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl(iconSvgUrl));
    }
}
