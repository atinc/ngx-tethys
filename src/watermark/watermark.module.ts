import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyWatermarkComponent } from './watermark.component';
@NgModule({
    declarations: [ThyWatermarkComponent],
    imports: [CommonModule, ThySharedModule],
    exports: [ThyWatermarkComponent],
    providers: []
})
export class ThyWatermarkModule {}
