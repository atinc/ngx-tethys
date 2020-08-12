import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyStepperBasicExampleComponent } from './basic/basic.component';
import { ThyStepperSwitchDialogExampleComponent } from './switch-dialog/switch-dialog.component';

const COMPONENTS = [ThyStepperBasicExampleComponent, ThyStepperSwitchDialogExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, NgxTethysModule],
    entryComponents: COMPONENTS,
    exports: COMPONENTS,
    providers: []
})
export class ThyStepperExamplesModule {}
