import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyImageDirective } from './image.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThyImageGroup } from './image-group.component';
import { ThyImagePreview } from './preview/image-preview.component';
import { ThyImageService } from './image.service';
import { PortalModule } from '@angular/cdk/portal';
import { THY_IMAGE_DEFAULT_PREVIEW_OPTIONS_PROVIDER } from './image.config';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyCopyModule } from 'ngx-tethys/copy';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyActionModule } from 'ngx-tethys/action';
import { ThyLazyImageDirective } from './lazy-image.directive';
import { ThyLazyImageService } from './lazy-image.service';
import { LazyImageGroupComponent } from './lazy-image-group.component';
import { THY_LAZY_IMAGE_CONFIG_PROVIDER } from './lazy-image.config';

@NgModule({
    exports: [
        ThyImageDirective, 
        ThyImageGroup, 
        ThyImagePreview,
        ThyLazyImageDirective,
        LazyImageGroupComponent
    ],
    imports: [
        CommonModule,
        PortalModule,
        DragDropModule,
        ThyIconModule,
        ThyDialogModule,
        ThyDividerModule,
        ThyTooltipModule,
        ThyCopyModule,
        ThyLoadingModule,
        ThyActionModule,
        ThyImageDirective,
        ThyImageGroup,
        ThyImagePreview,
        ThyLazyImageDirective,
        LazyImageGroupComponent
    ],
    providers: [
        ThyImageService, 
        THY_IMAGE_DEFAULT_PREVIEW_OPTIONS_PROVIDER,
        ThyLazyImageService,
        THY_LAZY_IMAGE_CONFIG_PROVIDER
    ]
})
export class ThyImageModule {}
