import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCarouselComponent } from './carousel.component';
import { ThyCarouselItemDirective } from 'ngx-tethys/carousel/carousel-item.directive';

const COMPONENTS = [ThyCarouselComponent, ThyCarouselItemDirective];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [CommonModule]
})
export class ThyCarouselModule {}
