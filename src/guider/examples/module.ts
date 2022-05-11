import { NgxTethysModule } from 'ngx-tethys';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyGuiderBasicTipExampleComponent } from './basic-tip/basic-tip.component';
import { CustomTipComponent, ThyGuiderCustomHintExampleComponent } from './custom-hint/custom-hint.component';
import { ThyGuiderMultiStepTipExampleComponent } from './multi-step-tip/multi-step-tip.component';
import { ThyGuiderCustomPositionExampleComponent } from './custom-position/custom-position.component';
import { ThyGuiderDirectiveHintExampleComponent } from './directive-hint/directive-hint.component';
import { ThyGuiderCustomHintClassExampleComponent } from './custom-hint-class/custom-hint-class.component';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
    ThyGuiderBasicTipExampleComponent,
    ThyGuiderCustomHintExampleComponent,
    ThyGuiderMultiStepTipExampleComponent,
    ThyGuiderCustomPositionExampleComponent,
    ThyGuiderDirectiveHintExampleComponent,
    ThyGuiderCustomHintClassExampleComponent,
    CustomTipComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, NgxTethysModule, FormsModule],
    exports: [...COMPONENTS]
})
export class ThyGuiderExamplesModule {}
