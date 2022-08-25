import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCarouselBasicExampleComponent } from './basic/basic.component';
import { ThyCarouselModule } from 'ngx-tethys/carousel';

const COMPONENTS = [ThyCarouselBasicExampleComponent];

@NgModule({
    imports: [CommonModule, ThyCarouselModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class ThyCarouselExamplesModule {}
