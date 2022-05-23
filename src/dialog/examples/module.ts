import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThySelectModule } from 'ngx-tethys/select';

import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyDialogBackdropExampleComponent } from './backdrop/backdrop.component';
import { ThyDialogBasicExampleComponent } from './basic/basic.component';
import { ThyDialogBasicContentComponent } from './basic/dialog-content.component';
import { ThyDialogConfirmExampleComponent } from './confirm/confirm.component';
import { ThyDialogFooterLayoutExampleComponent } from './layout/dialog-layout.component';
import { ThyDialogLayoutExampleComponent } from './layout/layout.component';
import { ThyDialogSizeExampleComponent } from './size/size.component';

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
    imports: [CommonModule, FormsModule, ThyDialogModule, CdkScrollableModule, ThySelectModule],
    exports: [],
    providers: COMPONENTS
})
export class ThyDialogExamplesModule {}
