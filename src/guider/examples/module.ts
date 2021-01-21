import { NgxTethysModule } from 'ngx-tethys';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyGuiderTipWithoutTargetExampleComponent } from './tip-without-target/tip-without-target.component';
import { ThyGuiderBasicTipExampleComponent } from './basic-tip/basic-tip.component';
import { CustomTipComponent, ThyGuiderCustomTipExampleComponent } from './custom-tip/custom-tip.component';
import { ThyGuiderMultiStepTipExampleComponent } from './multi-step-tip/multi-step-tip.component';
import { ThyGuiderCustomPositionExampleComponent } from './custom-position/custom-position.component';

const COMPONENTS = [
    ThyGuiderBasicTipExampleComponent,
    ThyGuiderTipWithoutTargetExampleComponent,
    ThyGuiderCustomTipExampleComponent,
    ThyGuiderMultiStepTipExampleComponent,
    ThyGuiderCustomPositionExampleComponent,
    CustomTipComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, NgxTethysModule],
    exports: [...COMPONENTS]
})
export class ThyGuiderExamplesModule {}
