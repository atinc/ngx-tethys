import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThySlideService } from './slide.service';
import { ThySlideContainer } from './slide-container.component';
import { ThyInternalSlideRef } from './slide-ref.service';
import { ThySlideLayout } from './slide-layout/slide-layout.component';
import { ThySlideHeader } from './slide-header/slide-header.component';
import { ThySlideBody } from './slide-body/slide-body.component';
import { ThySlideBodySection } from './slide-body/slide-body-section.component';
import { ThySlideFooter } from './slide-footer/slide-footer.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { THY_SLIDE_DEFAULT_CONFIG_PROVIDER } from './slide.config';
import { ThyDrawerContainerDirective } from './drawer/drawer-container.directive';
import { ThyActionModule } from 'ngx-tethys/action';

@NgModule({
    imports: [
        CommonModule,
        ThySharedModule,
        ThyIconModule,
        OverlayModule,
        PortalModule,
        ThyActionModule,
        ThySlideContainer,
        ThySlideLayout,
        ThySlideHeader,
        ThySlideBody,
        ThySlideBodySection,
        ThySlideFooter,
        ThyDrawerContainerDirective
    ],
    exports: [ThySlideLayout, ThySlideHeader, ThySlideBody, ThySlideBodySection, ThySlideFooter, ThyDrawerContainerDirective],
    providers: [ThyInternalSlideRef, ThySlideService, THY_SLIDE_DEFAULT_CONFIG_PROVIDER]
})
export class ThySlideModule {}
