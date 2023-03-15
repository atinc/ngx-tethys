import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyResultComponent } from './result.component';

@NgModule({
    imports: [CommonModule, ThyResultComponent],
    exports: [ThyResultComponent]
})
export class ThyResultModule {}
