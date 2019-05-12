import { NgModule } from '@angular/core';
import { ThyRowDirective } from './thy-row.directive';
import { ThyColDirective } from './thy-clo.directive';
import { ThyAutofocusDirective } from './thy-autofocus.directive';
import { ThyEnterDirective } from './thy-enter.directive';
import { ThyCtrlEnterDirective } from './thy-ctrl-enter.directive';
import { ThyShowDirective } from './thy-show';
import { ThyStopPropagationDirective } from './thy-stop-propagation.directive';
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
        ThyContextMenuDirective
    ],
    providers: []
})
export class ThyDirectiveModule {}
