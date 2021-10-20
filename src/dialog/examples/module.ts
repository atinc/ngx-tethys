import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyDialogBasicExampleComponent } from './basic/basic.component';
import { ThyDialogBasicContentComponent } from './basic/dialog-content.component';
import { ThyDialogConfirmExampleComponent } from './confirm/confirm.component';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { ThyDialogSizeExampleComponent } from './size/size.component';
import { ThyDialogBackdropExampleComponent } from './backdrop/backdrop.component';
import { ThyDialogLayoutExampleComponent } from './layout/layout.component';
import { ThyDialogFooterLayoutExampleComponent } from './layout/dialog-layout.component';

const COMPONENTS = [
    ThyDialogBasicExampleComponent,
    ThyDialogBasicContentComponent,
    ThyDialogConfirmExampleComponent,
    ThyDialogSizeExampleComponent,
    ThyDialogBackdropExampleComponent,
    ThyDialogLayoutExampleComponent,
    ThyDialogFooterLayoutExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule, CdkScrollableModule],
    exports: [],
    providers: COMPONENTS
})
export class ThyDialogExamplesModule {}
