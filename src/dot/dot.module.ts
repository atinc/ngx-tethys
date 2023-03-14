import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyDotComponent } from './dot.component';

@NgModule({
    imports: [CommonModule, ThyDotComponent],
    exports: [ThyDotComponent]
})
export class ThyDotModule {}
