import { NgModule } from '@angular/core';
import {
    ThyMarkdownParserService,
    ThyDefaultMarkdownParserService,
    ThyMarkdownPlanTextParserService,
    ThyDefaultMarkdownPlanTextParserService
} from './thy-markdown-parser.service';
import { ThyMarkdownParser } from './thy-markdown-parser.directive';
import { ThyMarkdownPlanTextParser } from './thy-markdown-text-parser.directive';

@NgModule({
    declarations: [ThyMarkdownParser, ThyMarkdownPlanTextParser],
    exports: [ThyMarkdownParser, ThyMarkdownPlanTextParser],
    providers: [
        {
            provide: ThyMarkdownParserService,
            useClass: ThyDefaultMarkdownParserService
        },
        {
            provide: ThyMarkdownPlanTextParserService,
            useClass: ThyDefaultMarkdownPlanTextParserService
        }
    ]
})
export class ThyMarkdownModule {}
