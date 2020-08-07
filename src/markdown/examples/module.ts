import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTethysModule, ThyMarkdownModule, ThyMarkdownParserService } from 'ngx-tethys';
import { CustomMarkdownParserService } from './custom-markdown.service';

import { ThyMarkdownParserExampleComponent } from './parser/parser.component';
import { ThyMarkdownPlanTextExampleComponent } from './plan-text/plan-text.component';

const COMPONENTS = [ThyMarkdownParserExampleComponent, ThyMarkdownPlanTextExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, NgxTethysModule, ThyMarkdownModule],
    exports: [...COMPONENTS],
    providers: [
        {
            provide: ThyMarkdownParserService,
            useClass: CustomMarkdownParserService
        }
    ]
})
export class ThyMarkdownExamplesModule {
    constructor() {}
}
