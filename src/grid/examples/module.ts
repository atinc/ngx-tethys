import { NgModule } from '@angular/core';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyGridBasicExampleComponent } from './basic/basic.component';
import { ThySharedModule } from 'ngx-tethys/shared';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, NgxTethysModule, ThySharedModule],
    declarations: [ThyGridBasicExampleComponent],
    exports: [ThyGridBasicExampleComponent],
    entryComponents: [ThyGridBasicExampleComponent]
})
export class ThyGridExamplesModule {}
