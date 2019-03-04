import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ThyDialogContainerComponent } from './dialog-container.component';
import { ThyDialog } from './dialog.service';
import { DialogHeaderComponent } from './header/dialog-header.component';
import { DialogBodyComponent } from './body/dialog-body.component';
import { DialogFooterComponent } from './footer/dialog-footer.component';
import { ThyButtonModule } from '../button';

import { THY_DIALOG_DEFAULT_OPTIONS_PROVIDER } from './dialog.config';
import { ThyConfirmComponent } from './confirm/confirm.component';
import { THY_CONFIRM_DEFAULT_OPTIONS_PROVIDER } from './confirm.config';

@NgModule({
    declarations: [
        ThyDialogContainerComponent,
        DialogHeaderComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        ThyConfirmComponent
    ],
    imports: [CommonModule, PortalModule, OverlayModule, ThyButtonModule],
    providers: [ThyDialog, THY_DIALOG_DEFAULT_OPTIONS_PROVIDER, THY_CONFIRM_DEFAULT_OPTIONS_PROVIDER],
    entryComponents: [ThyDialogContainerComponent, ThyConfirmComponent],
    exports: [ThyDialogContainerComponent, DialogHeaderComponent, DialogBodyComponent, DialogFooterComponent]
})
export class ThyDialogModule {}
