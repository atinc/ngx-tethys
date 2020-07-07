import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyDialogBasicExampleComponent } from './basic/basic.component';
import { ThyDialogBasicContentComponent } from './basic/dialog-content.component';
import { ThyDialogConfirmExampleComponent } from './confirm/confirm.component';

const COMPONENTS = [ThyDialogBasicExampleComponent, ThyDialogBasicContentComponent, ThyDialogConfirmExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: [],
    providers: COMPONENTS
})
export class ThyDialogExamplesModule {}
