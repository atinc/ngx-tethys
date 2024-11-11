import { NgModule } from '@angular/core';
import { warnDeprecation } from 'ngx-tethys/util';
import { ThyDragDirective } from './drag.directive';
import { ThyDragHandleDirective } from './drag-handle.directive';
import { ThyDragContentDirective } from './drag-content.directive';
import { ThyDropContainerDirective } from './drop-container.directive';

/**
 * @deprecated please use @angular/cdk/drag-drop
 */
@NgModule({
    imports: [ThyDropContainerDirective, ThyDragDirective, ThyDragHandleDirective, ThyDragContentDirective],
    exports: [ThyDropContainerDirective, ThyDragDirective, ThyDragHandleDirective, ThyDragContentDirective],
    providers: []
})
export class ThyDragDropModule {
    constructor() {
        warnDeprecation('`ThyDragDropModule` is deprecated, please use `@angular/cdk/drag-drop` instead.');
    }
}
