import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySharedModule } from '../shared';
import { ThySlideService } from './slide.service';
import { ThySlideContainerComponent } from './slide-container.component';
import { ThySlideRef, ThyInternalSlideRef } from './slide-ref.service';
import { ThySlideLayoutComponent } from './slide-layout/slide-layout.component';
import { ThySlideHeaderComponent } from './slide-header/slide-header.component';
import { ThySlideBodyComponent } from './slide-body/slide-body.component';
import { ThySlideBodySectionComponent } from './slide-body/slide-body-section.component';
import { ThySlideFooterComponent } from './slide-footer/slide-footer.component';
import { ThyIconModule } from '../icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { THY_SLIDE_DEFAULT_OPTIONS_PROVIDER } from './slide.config';
import { ThyDrawerContainerDirective } from './drawer/drawer-container.directive';

@NgModule({
    declarations: [
        ThySlideContainerComponent,
        ThySlideLayoutComponent,
        ThySlideHeaderComponent,
        ThySlideBodyComponent,
        ThySlideBodySectionComponent,
        ThySlideFooterComponent,
        ThyDrawerContainerDirective
    ],
    entryComponents: [ThySlideContainerComponent],
    imports: [CommonModule, ThySharedModule, ThyIconModule, OverlayModule, PortalModule],
    exports: [
        ThySlideLayoutComponent,
        ThySlideHeaderComponent,
        ThySlideBodyComponent,
        ThySlideBodySectionComponent,
        ThySlideFooterComponent,
        ThyDrawerContainerDirective
    ],
    providers: [ThyInternalSlideRef, ThySlideService, THY_SLIDE_DEFAULT_OPTIONS_PROVIDER]
})
export class ThySlideModule {}
