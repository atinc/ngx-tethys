import { Component, NgModule } from '@angular/core';
import { ThyTranscludeDirective } from './ng-transclude.directive';
import { ThyTranslate } from './translate';
import { ThyDraggableDirective } from '../shared/draggable.directive';

@NgModule({
    declarations: [
        ThyTranscludeDirective,
        ThyDraggableDirective
    ],
    exports: [
        ThyTranscludeDirective,
        ThyDraggableDirective
    ],
    providers: [
        ThyTranslate
    ]
})
export class ThySharedModule {

}

