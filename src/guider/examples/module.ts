import { ThyFormModule } from 'ngx-tethys/form';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyGuiderModule } from 'ngx-tethys/guider';
import { ThyIconModule } from 'ngx-tethys/icon';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyGuiderBasicTipExampleComponent } from './basic-tip/basic-tip.component';
import { ThyGuiderCustomHintClassExampleComponent } from './custom-hint-class/custom-hint-class.component';
import { CustomTipComponent, ThyGuiderCustomHintExampleComponent } from './custom-hint/custom-hint.component';
import { ThyGuiderCustomPositionExampleComponent } from './custom-position/custom-position.component';
import { ThyGuiderDirectiveHintExampleComponent } from './directive-hint/directive-hint.component';
import { ThyGuiderMultiStepTipExampleComponent } from './multi-step-tip/multi-step-tip.component';

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
    imports: [CommonModule, ThyGuiderModule, FormsModule, ThyIconModule, ThyFormModule, ThyGridModule],
    exports: [...COMPONENTS]
})
export class ThyGuiderExamplesModule {}
