import { NgModule } from '@angular/core';
import { ThyRowDirective } from './thy-row.directive';
import { ThyColDirective } from './thy-clo.directive';
import { ThyAutofocusDirective } from './thy-autofocus.directive';
import { ThyEnterDirective } from './thy-enter.directive';
import { ThyShowDirective } from './thy-show';

@NgModule({
    declarations: [
        ThyRowDirective,
        ThyColDirective,
        ThyAutofocusDirective,
        ThyEnterDirective,
        ThyShowDirective
    ],
    exports: [
        ThyRowDirective,
        ThyColDirective,
        ThyAutofocusDirective,
        ThyEnterDirective,
        ThyShowDirective
    ]
})
export class ThyDirectiveModule {

}
