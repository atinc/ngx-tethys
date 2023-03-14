import { NgModule } from '@angular/core';
import { ThyDragDirective } from './drag.directive';
import { ThyDragHandleDirective } from './drag-handle.directive';
import { ThyDragContentDirective } from './drag-content.directive';
import { ThyDropContainerDirective } from './drop-container.directive';

@NgModule({
    imports: [ThyDropContainerDirective, ThyDragDirective, ThyDragHandleDirective, ThyDragContentDirective],
    exports: [ThyDropContainerDirective, ThyDragDirective, ThyDragHandleDirective, ThyDragContentDirective],
    providers: []
})
export class ThyDragDropModule {}
