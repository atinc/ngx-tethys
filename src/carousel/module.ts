import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCarouselComponent } from './carousel.component';
import { ThyCarouselItemDirective } from './carousel-item.directive';
import { ThyDotModule } from 'ngx-tethys/dot';
import { ThyIconModule } from 'ngx-tethys/icon';

const COMPONENTS = [ThyCarouselComponent, ThyCarouselItemDirective];

@NgModule({
    exports: [...COMPONENTS],
    imports: [CommonModule, ThyDotModule, ThyIconModule, ...COMPONENTS]
})
export class ThyCarouselModule {}
