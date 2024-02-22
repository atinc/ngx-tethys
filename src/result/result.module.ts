import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyResult } from './result.component';

@NgModule({
    imports: [CommonModule, ThyResult],
    exports: [ThyResult]
})
export class ThyResultModule {}
