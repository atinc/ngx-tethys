import { Component, NgModule } from '@angular/core';
import { ThyTranscludeDirective } from './ng-transclude.directice';

@NgModule({
    declarations: [
        ThyTranscludeDirective
    ],
    exports: [
        ThyTranscludeDirective
    ],
    providers: [
    ]
})
export class ThySharedModule {

}

