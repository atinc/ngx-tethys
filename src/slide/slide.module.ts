import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { ThySharedModule } from '../shared';
import { ThySlideService } from './slide.service';
import { ThySlideContainerComponent } from './slide-container.component';
import { ThySlideRef } from './slide-ref.service';
import { ThySlideLayoutComponent } from './slide-layout/slide-layout.component';
import { ThySlideHeaderComponent } from './slide-header/slide-header.component';
import { ThySlideBodyComponent } from './slide-body/slide-body.component';
import { ThySlideBodySectionComponent } from './slide-body/slide-body-section.component';
import { ThySlideFooterComponent } from './slide-footer/slide-footer.component';
import { ThyIconModule } from '../icon';

@NgModule({
    declarations: [
        ThySlideContainerComponent,
        ThySlideLayoutComponent,
        ThySlideHeaderComponent,
        ThySlideBodyComponent,
        ThySlideBodySectionComponent,
        ThySlideFooterComponent
    ],
    entryComponents: [ThySlideContainerComponent],
    imports: [CommonModule, ThySharedModule, ThyIconModule],
    exports: [
        ThySlideLayoutComponent,
        ThySlideHeaderComponent,
        ThySlideBodyComponent,
        ThySlideBodySectionComponent,
        ThySlideFooterComponent
    ],
    providers: [ComponentLoaderFactory, ThySlideService, ThySlideRef]
})
export class ThySlideModule {}
