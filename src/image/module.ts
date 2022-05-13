import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyImageDirective } from './image.directive';
import { ThyImageGroupComponent } from './image-group.component';
import { ThyImagePreviewComponent } from './preview/image-preview.component';
import { ThyImageService } from './image.service';
import { PortalModule } from '@angular/cdk/portal';
import { ThyImagePreviewContainerComponent } from './preview/image-preview.container.component';
import { THY_IMAGE_DEFAULT_PREVIEW_OPTIONS_PROVIDER } from './image-config';

@NgModule({
    declarations: [ThyImageDirective, ThyImageGroupComponent, ThyImagePreviewComponent, ThyImagePreviewContainerComponent],
    exports: [ThyImageDirective, ThyImageGroupComponent, ThyImagePreviewComponent, ThyImagePreviewContainerComponent],
    imports: [CommonModule, PortalModule],
    providers: [ThyImageService, THY_IMAGE_DEFAULT_PREVIEW_OPTIONS_PROVIDER]
})
export class ThyImageModule {}
