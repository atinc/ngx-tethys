import { NgModule } from '@angular/core';
import { ThyCarouselBasicComponent } from './basic/basic.component';
import { CommonModule } from '@angular/common';

import { ThyCarouselModule } from 'ngx-tethys/carousel';

const COMPONENTS = [ThyCarouselBasicComponent];

@NgModule({
    imports: [CommonModule, ThyCarouselModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class ThyCarouselExamplesModule {}
