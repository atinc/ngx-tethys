import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyDialogBasicExampleComponent } from './basic/basic.component';
import { ThyDialogBasicContentComponent } from './basic/dialog-content.component';
import { ThyDialogConfirmExampleComponent } from './confirm/confirm.component';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { ThyDialogSizeExampleComponent } from './size/size.component';
import { ThyDialogFooterAlignExampleComponent } from './footer-align/footer-align.component';
import { ThyDialogFooterDividerExampleComponent } from './footer-divider/footer-divider.component';
import { ThyDialogBackdropExampleComponent } from './backdrop/backdrop.component';

const COMPONENTS = [
    ThyDialogBasicExampleComponent,
    ThyDialogBasicContentComponent,
    ThyDialogConfirmExampleComponent,
    ThyDialogSizeExampleComponent,
    ThyDialogFooterAlignExampleComponent,
    ThyDialogFooterDividerExampleComponent,
    ThyDialogBackdropExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule, CdkScrollableModule],
    exports: [],
    providers: COMPONENTS
})
export class ThyDialogExamplesModule {}
