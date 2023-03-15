import { NgModule } from '@angular/core';
import { ThyTranscludeDirective } from './ng-transclude.directive';
import { ThyAutofocusDirective } from './directives/thy-autofocus.directive';
import { ThyEnterDirective } from './directives/thy-enter.directive';
import { ThyCtrlEnterDirective } from './directives/thy-ctrl-enter.directive';
import { ThyShowDirective } from './directives/thy-show';
import { ThyStopPropagationDirective } from './directives/thy-stop-propagation.directive';
import { ThyContextMenuDirective } from './directives/thy-contextmenu.directive';
import { ThyScrollDirective } from './directives/thy-scroll.directive';
import { ThyDragDropDirective } from './directives/thy-drag-drop.directive';
import { ThyStringOrTemplateOutletDirective } from './directives/string-or-template-outlet.directive';
import { ThyViewOutletDirective } from './directives/view-outlet.directive';

@NgModule({
    imports: [
        ThyViewOutletDirective,
        ThyTranscludeDirective,
        ThyAutofocusDirective,
        ThyEnterDirective,
        ThyCtrlEnterDirective,
        ThyShowDirective,
        ThyStopPropagationDirective,
        ThyContextMenuDirective,
        ThyScrollDirective,
        ThyDragDropDirective,
        ThyStringOrTemplateOutletDirective
    ],
    exports: [
        ThyTranscludeDirective,
        ThyAutofocusDirective,
        ThyEnterDirective,
        ThyCtrlEnterDirective,
        ThyShowDirective,
        ThyStopPropagationDirective,
        ThyContextMenuDirective,
        ThyScrollDirective,
        ThyDragDropDirective,
        ThyStringOrTemplateOutletDirective,
        ThyViewOutletDirective
    ],
    providers: []
})
export class ThySharedModule {}
