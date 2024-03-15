import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThySlider } from './slider.component';

@NgModule({
    imports: [CommonModule, FormsModule, ThySlider],
    exports: [ThySlider],
    providers: []
})
export class ThySliderModule {}
