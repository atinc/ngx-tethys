import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyWatermarkDirective } from './watermark.directive';

@NgModule({
    declarations: [ThyWatermarkDirective],
    imports: [CommonModule, ThySharedModule],
    exports: [ThyWatermarkDirective],
    providers: []
})
export class ThyWatermarkModule {}
