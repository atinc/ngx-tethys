import { NgModule } from '@angular/core';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyRasterBasicExampleComponent } from './basic/basic.component';
import { ThyDirectiveModule } from 'ngx-tethys/directive';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule,NgxTethysModule,ThyDirectiveModule],
    declarations: [ThyRasterBasicExampleComponent],
    exports: [ThyRasterBasicExampleComponent],
    entryComponents: [ThyRasterBasicExampleComponent]
})


export class ThyRasterExamplesModule {}
