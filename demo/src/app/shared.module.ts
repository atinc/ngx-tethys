import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxTethysModule } from 'ngx-tethys';
import { CommonModule } from '@angular/common';
import { LiveDemoComponent, LiveDemosComponent } from './core/live-demo/live-demo.component';
import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import { DOCS_COMPONENTS } from './docs';
export function hljsLanguages() {
    return [
        { name: 'typescript', func: typescript },
        { name: 'ts', func: typescript },
        { name: 'scss', func: scss },
        { name: 'xml', func: xml },
        { name: 'html', func: xml }
    ];
}

@NgModule({
    declarations: [LiveDemoComponent, LiveDemosComponent, ...DOCS_COMPONENTS],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        NgxTethysModule,
        HighlightModule.forRoot({
            languages: hljsLanguages
        })
    ],
    exports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        NgxTethysModule,
        HighlightModule,
        LiveDemoComponent,
        LiveDemosComponent,
        ...DOCS_COMPONENTS
    ]
})
export class SharedModule {}
