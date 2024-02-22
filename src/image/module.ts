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

@NgModule({
    exports: [ThyImageDirective, ThyImageGroup, ThyImagePreview],
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
        ThyImagePreview
    ],
    providers: [ThyImageService, THY_IMAGE_DEFAULT_PREVIEW_OPTIONS_PROVIDER]
})
export class ThyImageModule {}
