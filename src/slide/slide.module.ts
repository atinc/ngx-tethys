import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThySlideService } from './slide.service';
import { ThySlideContainerComponent } from './slide-container.component';
import { ThySlideRef, ThyInternalSlideRef } from './slide-ref.service';
import { ThySlideLayoutComponent } from './slide-layout/slide-layout.component';
import { ThySlideHeaderComponent } from './slide-header/slide-header.component';
import { ThySlideBodyComponent } from './slide-body/slide-body.component';
import { ThySlideBodySectionComponent } from './slide-body/slide-body-section.component';
import { ThySlideFooterComponent } from './slide-footer/slide-footer.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { THY_SLIDE_DEFAULT_CONFIG_PROVIDER } from './slide.config';
import { ThyDrawerContainerDirective } from './drawer/drawer-container.directive';
import { ThyActionModule } from 'ngx-tethys/action';

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
    imports: [CommonModule, ThySharedModule, ThyIconModule, OverlayModule, PortalModule, ThyActionModule],
    exports: [
        ThySlideLayoutComponent,
        ThySlideHeaderComponent,
        ThySlideBodyComponent,
        ThySlideBodySectionComponent,
        ThySlideFooterComponent,
        ThyDrawerContainerDirective
    ],
    providers: [ThyInternalSlideRef, ThySlideService, THY_SLIDE_DEFAULT_CONFIG_PROVIDER]
})
export class ThySlideModule {}
