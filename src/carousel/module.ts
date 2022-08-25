import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCarouselComponent } from './carousel.component';

const COMPONENTS = [ThyCarouselComponent];

@NgModule({
    imports: [CommonModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class ThyCarouselModule {}
