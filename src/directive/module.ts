import { NgModule } from '@angular/core';
import { ThyAutofocusDirective } from './thy-autofocus.directive';
import { ThyEnterDirective } from './thy-enter.directive';
import { ThyCtrlEnterDirective } from './thy-ctrl-enter.directive';
import { ThyShowDirective } from './thy-show';
import { ThyStopPropagationDirective } from './thy-stop-propagation.directive';
import { ThyContextMenuDirective } from './thy-contextmenu.directive';
import { ThyScrollDirective } from './thy-scroll.directive';
import { ThyCopyDirective } from './thy-copy.directive';
import { ThyDragDropDirective } from './thy-drag-drop.directive';

@NgModule({
    declarations: [
        ThyAutofocusDirective,
        ThyEnterDirective,
        ThyCtrlEnterDirective,
        ThyShowDirective,
        ThyStopPropagationDirective,
        ThyContextMenuDirective,
        ThyScrollDirective,
        ThyCopyDirective,
        ThyDragDropDirective
    ],
    exports: [
        ThyCtrlEnterDirective,
        ThyAutofocusDirective,
        ThyEnterDirective,
        ThyShowDirective,
        ThyStopPropagationDirective,
        ThyContextMenuDirective,
        ThyScrollDirective,
        ThyCopyDirective,
        ThyDragDropDirective
    ],
    providers: []
})
export class ThyDirectiveModule {}
