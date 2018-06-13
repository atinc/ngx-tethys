import { Component, NgModule } from '@angular/core';
import { ThyTranscludeDirective } from './ng-transclude.directive';
import { ThyTranslate } from './translate';
import { ThyDraggableDirective } from '../shared/draggable.directive';
import { ThyPositioningService } from '../positioning/positioning.service';
import { ThyMarkdownParserDirective } from '../shared/markdown-parser.directive';

@NgModule({
    declarations: [
        ThyTranscludeDirective,
        ThyDraggableDirective,
        ThyMarkdownParserDirective
    ],
    exports: [
        ThyTranscludeDirective,
        ThyDraggableDirective,
        ThyMarkdownParserDirective
    ],
    providers: [
        ThyTranslate,
        ThyPositioningService
    ]
})
export class ThySharedModule {

}

