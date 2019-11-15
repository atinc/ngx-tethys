import { NgModule } from '@angular/core';
import { ThyMarkdownParserService } from './thy-markdown-parser.service';
import { ThyMarkdownParserDirective } from './thy-markdown-parser.directive';
import { ThyMarkdownPlanTextParserDirective } from './thy-markdown-text-parser.directive';

@NgModule({
    declarations: [ThyMarkdownParserDirective, ThyMarkdownPlanTextParserDirective],
    exports: [ThyMarkdownParserDirective, ThyMarkdownPlanTextParserDirective],
    providers: [ThyMarkdownParserService]
})
export class ThyMarkdownModule {}
