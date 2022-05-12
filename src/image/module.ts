import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyImageDirective } from './image.directive';
import { ThyImageGroupComponent } from './image-group.component';
import { ThyImagePreviewComponent } from './preview/image-preview.component';
import { ThyImageService } from './image.service';

@NgModule({
    declarations: [ThyImageDirective, ThyImageGroupComponent, ThyImagePreviewComponent],
    exports: [ThyImageDirective, ThyImageGroupComponent, ThyImagePreviewComponent],
    imports: [CommonModule],
    providers: [ThyImageService]
})
export class ThyImageModule {}
