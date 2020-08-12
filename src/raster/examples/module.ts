import { NgModule } from '@angular/core';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyRasterBasicExampleComponent } from './basic/basic.component';

import { CommonModule } from '@angular/common';
@NgModule({
    imports: [CommonModule,NgxTethysModule],
    declarations: [ThyRasterBasicExampleComponent],
    exports: [ThyRasterBasicExampleComponent],
    entryComponents: [ThyRasterBasicExampleComponent]
})


export class ThyRasterExamplesModule {}
