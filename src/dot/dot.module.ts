import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyDotComponent } from './dot.component';

@NgModule({
    declarations: [ThyDotComponent],
    imports: [CommonModule],
    exports: [ThyDotComponent]
})
export class ThyDotModule {}
