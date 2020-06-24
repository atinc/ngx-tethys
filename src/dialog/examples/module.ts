import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyDialogBasicContentComponent } from './basic/dialog-content.component';
import { ThyDialogBasicExampleComponent } from './basic/basic.component';
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
