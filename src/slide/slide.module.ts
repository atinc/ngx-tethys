import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { ThySharedModule } from '../shared';
import { ThySlideService } from './slide.service';
import { ThySlideContainerComponent } from './slide-container.component';
import { ThySlideRef } from './slide-ref.service';
import { ThySlideHeaderComponent } from './slide-header/slide-header.component';
import { ThySlideBodyComponent } from './slide-body/slide-body.component';

@NgModule({
    declarations: [
        ThySlideContainerComponent,
        ThySlideHeaderComponent,
        ThySlideBodyComponent
    ],
    entryComponents: [
        ThySlideContainerComponent
    ],
    imports: [
        CommonModule,
        ThySharedModule,
    ],
    exports: [
        ThySlideHeaderComponent,
        ThySlideBodyComponent
    ],
    providers: [
        ComponentLoaderFactory,
        ThySlideService,
        ThySlideRef
    ]
})
export class ThySlideModule {

}
