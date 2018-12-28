import { NgModule } from '@angular/core';
import { ThyRowDirective } from './thy-row.directive';
import { ThyColDirective } from './thy-clo.directive';
import { ThyAutofocusDirective } from './thy-autofocus.directive';
import { ThyEnterDirective } from './thy-enter.directive';
import { ThyCtrlEnterDirective } from './thy-ctrl-enter.directive';
import { ThyShowDirective } from './thy-show';
import { ThyStopPropagationDirective } from './thy-stop-propagation.directive';
import { ThyMarkdownParserDirective } from './thy-markdown/thy-markdown-parser.directive';
import { ThyMarkdownParserService, ThyDefaultMarkdownParserService } from './thy-markdown/thy-markdown-parser.service';
import { ThyContextMenuDirective } from './thy-contextmenu.directive';

@NgModule({
    declarations: [
        ThyRowDirective,
        ThyColDirective,
        ThyAutofocusDirective,
        ThyEnterDirective,
        ThyCtrlEnterDirective,
        ThyShowDirective,
        ThyStopPropagationDirective,
        ThyMarkdownParserDirective,
        ThyContextMenuDirective
    ],
    exports: [
        ThyRowDirective,
        ThyColDirective,
        ThyCtrlEnterDirective,
        ThyAutofocusDirective,
        ThyEnterDirective,
        ThyShowDirective,
        ThyStopPropagationDirective,
        ThyMarkdownParserDirective,
        ThyContextMenuDirective
    ],
    providers: [
        {
            provide: ThyMarkdownParserService,
            useClass: ThyDefaultMarkdownParserService
        }
    ],
})
export class ThyDirectiveModule {

}
