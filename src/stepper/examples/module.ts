import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyStepperModule } from 'ngx-tethys/stepper';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyStepperBasicExampleComponent } from './basic/basic.component';
import { ThyStepperSwitchDialogExampleComponent } from './switch-dialog/switch-dialog.component';

const COMPONENTS = [ThyStepperBasicExampleComponent, ThyStepperSwitchDialogExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, ThyStepperModule, ThyDialogModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyStepperExamplesModule {}
