import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyLoadingComponent } from './loading.component';

@NgModule({
    imports: [CommonModule, ThyLoadingComponent],
    exports: [ThyLoadingComponent]
})
export class ThyLoadingModule {}
