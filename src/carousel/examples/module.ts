import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCarouselBasicExampleComponent } from './basic/basic.component';
import { ThyCarouselAutoPlayExampleComponent } from './auto-play/auto-play.component';
import { ThyCarouselEffectExampleComponent } from './effect/effect.component';
import { ThyCarouselDotExampleComponent } from './dot/dot.component';
import { ThyCarouselArrowExampleComponent } from './arrow/arrow.component';
import { ThyCarouselTriggerExampleComponent } from './trigger/trigger.component';
import { ThyCarouselModule } from 'ngx-tethys/carousel';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyButtonModule } from 'ngx-tethys/button';

const COMPONENTS = [
    ThyCarouselBasicExampleComponent,
    ThyCarouselAutoPlayExampleComponent,
    ThyCarouselEffectExampleComponent,
    ThyCarouselDotExampleComponent,
    ThyCarouselArrowExampleComponent,
    ThyCarouselTriggerExampleComponent
];

@NgModule({
    imports: [CommonModule, ThyCarouselModule, ThyIconModule, ThyButtonModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class ThyCarouselExamplesModule {}
