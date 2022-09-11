import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCarouselBasicExampleComponent } from './basic/basic.component';
import { ThyCarouselNoopExampleComponent } from './noop/noop.component';
import { ThyCarouselFadeExampleComponent } from './fade/fade.component';
import { ThyCarouselCustomTemplateExampleComponent } from './custom-template/custom-template.component';
import { ThyCarouselModule } from 'ngx-tethys/carousel';
import { ThyIconModule } from 'ngx-tethys/icon';

const COMPONENTS = [
    ThyCarouselBasicExampleComponent,
    ThyCarouselNoopExampleComponent,
    ThyCarouselFadeExampleComponent,
    ThyCarouselCustomTemplateExampleComponent
];

@NgModule({
    imports: [CommonModule, ThyCarouselModule, ThyIconModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class ThyCarouselExamplesModule {}
