import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxTethysModule } from 'ngx-tethys';
import { CommonModule } from '@angular/common';
import { LiveDemoComponent, LiveDemosComponent } from './core/live-demo/live-demo.component';
import { DemoTitleComponent } from './core/demo-title/demo-title.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { DOCS_COMPONENTS } from './docs';

export function getHighlightLanguages() {
    return {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml')
    };
}

@NgModule({
    declarations: [DemoTitleComponent, LiveDemoComponent, LiveDemosComponent, ...DOCS_COMPONENTS],
    imports: [CommonModule, BrowserModule, FormsModule, NgxTethysModule, HighlightModule],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                languages: getHighlightLanguages()
            }
        }
    ],
    exports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        NgxTethysModule,
        HighlightModule,
        LiveDemoComponent,
        DemoTitleComponent,
        LiveDemosComponent,
        ...DOCS_COMPONENTS
    ]
})
export class SharedModule {}
