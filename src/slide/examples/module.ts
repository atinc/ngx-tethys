import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThySlideBasicExampleComponent } from './basic/basic.component';
import { ThySlideBasicLayoutExampleComponent } from './basic-layout/basic-layout.component';
import { ThySlideCustomLayoutExampleComponent } from './custom-layout/custom-layout.component';
import { NgxTethysModule, THY_SLIDE_DEFAULT_CONFIG } from 'ngx-tethys';

const COMPONENTS = [ThySlideBasicExampleComponent, ThySlideBasicLayoutExampleComponent, ThySlideCustomLayoutExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: COMPONENTS,
    providers: [
        {
            provide: THY_SLIDE_DEFAULT_CONFIG,
            useValue: {
                drawerContainer: 'dg-channel'
            }
        }
    ]
})
export class ThySlideExamplesModule {}
