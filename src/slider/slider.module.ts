import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThySliderComponent } from './slider.component';

@NgModule({
    imports: [CommonModule, FormsModule, ThySliderComponent],
    exports: [ThySliderComponent],
    providers: []
})
export class ThySliderModule {}
