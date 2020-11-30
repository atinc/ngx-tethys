import { NgModule } from '@angular/core';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyRasterBasicExampleComponent } from './basic/basic.component';
import { ThySharedModule } from 'ngx-tethys/shared';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, NgxTethysModule, ThySharedModule],
    declarations: [ThyRasterBasicExampleComponent],
    exports: [ThyRasterBasicExampleComponent],
    entryComponents: [ThyRasterBasicExampleComponent]
})
export class ThyRasterExamplesModule {}
