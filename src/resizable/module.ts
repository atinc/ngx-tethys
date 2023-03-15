import { NgModule } from '@angular/core';
import { ThyResizableDirective } from './resizable.directive';
import { ThyResizeHandleComponent } from './resize-handle.component';
import { ThyResizeHandlesComponent } from './resize-handles.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, ThyResizableDirective, ThyResizeHandleComponent, ThyResizeHandlesComponent],
    exports: [ThyResizableDirective, ThyResizeHandleComponent, ThyResizeHandlesComponent]
})
export class ThyResizableModule {}
