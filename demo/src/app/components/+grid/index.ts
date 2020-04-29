import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoGridSectionComponent } from './grid-section.component';
import { DemoGridDefaultComponent } from './default/grid-default.component';
import { DemoGridBorderedComponent } from './bordered/grid-bordered.component';

@NgModule({
    declarations: [DemoGridSectionComponent, DemoGridDefaultComponent, DemoGridBorderedComponent],
    entryComponents: [DemoGridDefaultComponent, DemoGridBorderedComponent],
    imports: [SharedModule],
    exports: [DemoGridSectionComponent]
})
export class DemoGridModule {}
