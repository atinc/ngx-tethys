import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoRasterSectionComponent } from './raster-section.component';
import { DemoRasterBasicComponent } from './basic/basic.component';

@NgModule({
    imports: [SharedModule],
    exports: [DemoRasterSectionComponent],
    declarations: [DemoRasterSectionComponent, DemoRasterBasicComponent],
    entryComponents: [DemoRasterBasicComponent]
})
export class DemoRasterModule {}
