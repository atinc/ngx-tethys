import { NgModule } from '@angular/core';
import { ThyDragDirective } from './drag';
import { ThyDragHandleDirective } from './drag-handle';

@NgModule({
    imports: [],
    exports: [ThyDragDirective, ThyDragHandleDirective],
    declarations: [ThyDragDirective, ThyDragHandleDirective],
    providers: []
})
export class ThyDragDropModule {}
