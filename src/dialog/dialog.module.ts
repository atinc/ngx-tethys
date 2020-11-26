import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThySharedModule } from 'ngx-tethys/shared';
import { DialogBodyComponent } from './body/dialog-body.component';
import { THY_CONFIRM_DEFAULT_OPTIONS_PROVIDER } from './confirm.config';
import { ThyConfirmComponent } from './confirm/confirm.component';
import { ThyDialogContainerComponent } from './dialog-container.component';
import { THY_DIALOG_DEFAULT_OPTIONS_PROVIDER, THY_DIALOG_LAYOUT_CONFIG_PROVIDER } from './dialog.config';
import { ThyDialog } from './dialog.service';
import { DialogFooterComponent } from './footer/dialog-footer.component';
import { DialogHeaderComponent } from './header/dialog-header.component';

@NgModule({
    declarations: [ThyDialogContainerComponent, DialogHeaderComponent, DialogBodyComponent, DialogFooterComponent, ThyConfirmComponent],
    imports: [CommonModule, ThySharedModule, PortalModule, OverlayModule, ThyButtonModule, ThyIconModule, ThyFormModule, FormsModule],
    providers: [ThyDialog, THY_DIALOG_DEFAULT_OPTIONS_PROVIDER, THY_CONFIRM_DEFAULT_OPTIONS_PROVIDER, THY_DIALOG_LAYOUT_CONFIG_PROVIDER],
    entryComponents: [ThyDialogContainerComponent, ThyConfirmComponent],
    exports: [ThyDialogContainerComponent, DialogHeaderComponent, DialogBodyComponent, DialogFooterComponent]
})
export class ThyDialogModule {}
