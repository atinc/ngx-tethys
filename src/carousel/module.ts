import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCarouselComponent } from './carousel.component';
import { ThyCarouselItemDirective } from './carousel-item.directive';
import { ThyDotModule } from '../dot';
import { ThyIconModule } from '../icon';

const COMPONENTS = [ThyCarouselComponent, ThyCarouselItemDirective];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [CommonModule, ThyDotModule, ThyIconModule]
})
export class ThyCarouselModule {}
