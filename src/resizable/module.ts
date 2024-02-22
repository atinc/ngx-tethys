import { NgModule } from '@angular/core';
import { ThyResizableDirective } from './resizable.directive';
import { ThyResizeHandle } from './resize-handle.component';
import { ThyResizeHandles } from './resize-handles.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, ThyResizableDirective, ThyResizeHandle, ThyResizeHandles],
    exports: [ThyResizableDirective, ThyResizeHandle, ThyResizeHandles]
})
export class ThyResizableModule {}
