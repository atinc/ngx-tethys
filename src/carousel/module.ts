import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCarouselComponent } from './carousel.component';
import { ThyCarouselItemDirective } from './carousel-item.directive';
import { ThyDotModule } from 'ngx-tethys/dot';
import { ThyIconModule } from 'ngx-tethys/icon';

const COMPONENTS = [ThyCarouselComponent, ThyCarouselItemDirective];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [CommonModule, ThyDotModule, ThyIconModule]
})
export class ThyCarouselModule {}
