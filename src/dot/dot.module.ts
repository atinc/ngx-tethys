import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyDot } from './dot.component';

@NgModule({
    imports: [CommonModule, ThyDot],
    exports: [ThyDot]
})
export class ThyDotModule {}
