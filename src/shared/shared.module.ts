import { Component, NgModule } from '@angular/core';
import { ThyTranscludeDirective } from './ng-transclude.directice';
import { ThyTranslate } from './translate';

@NgModule({
    declarations: [
        ThyTranscludeDirective
    ],
    exports: [
        ThyTranscludeDirective
    ],
    providers: [
        ThyTranslate
    ]
})
export class ThySharedModule {

}

