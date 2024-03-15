import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyLoading } from './loading.component';

@NgModule({
    imports: [CommonModule, ThyLoading],
    exports: [ThyLoading]
})
export class ThyLoadingModule {}
