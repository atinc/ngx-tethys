import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoGridSectionComponent } from './grid-section.component';
import { DemoGridDefaultComponent } from './default/grid-default.component';
import { DemoGridBorderedComponent } from './bordered/grid-bordered.component';
import { DemoGridGroupComponent } from './group/grid-group.component';

@NgModule({
    declarations: [DemoGridSectionComponent, DemoGridDefaultComponent, DemoGridBorderedComponent, DemoGridGroupComponent],
    entryComponents: [DemoGridDefaultComponent, DemoGridBorderedComponent, DemoGridGroupComponent],
    imports: [SharedModule],
    exports: [DemoGridSectionComponent]
})
export class DemoGridModule {}
