import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared.module';
import { DemoBadgeIndependentUseComponent } from './demo/independent-use/independent-use.component';
import { DemoBadgeBasicComponent } from './demo/basic/basic.component';
import { DemoBadgeSectionComponent } from './badge-section.component';
import { DemoBadgeStatePointComponent } from './demo/state-point/state-point.component';
import { DemoBadgeSpecialComponent } from './demo/special/special.component';
import { DemoBadgeOverflowComponent } from './demo/overflow/overflow.component';
import { DemoBadgeTypeComponent } from './demo/type/type.component';

const DemoComponents = [
    DemoBadgeIndependentUseComponent,
    DemoBadgeBasicComponent,
    DemoBadgeStatePointComponent,
    DemoBadgeSpecialComponent,
    DemoBadgeOverflowComponent,
    DemoBadgeTypeComponent
];

@NgModule({
    imports: [SharedModule],
    exports: [DemoBadgeSectionComponent],
    declarations: [DemoBadgeSectionComponent, ...DemoComponents],
    entryComponents: [...DemoComponents],
    providers: []
})
export class DemoBadgeModule {}
