import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyActionModule } from 'ngx-tethys/action';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThySharedModule } from 'ngx-tethys/shared';
import { DialogBody } from './body/dialog-body.component';
import { THY_CONFIRM_DEFAULT_OPTIONS_PROVIDER } from './confirm.config';
import { ThyConfirm } from './confirm/confirm.component';
import { THY_CONFIRM_COMPONENT_TOKEN } from './confirm/token';
import { ThyDialogContainer } from './dialog-container.component';
import { THY_DIALOG_DEFAULT_OPTIONS_PROVIDER, THY_DIALOG_LAYOUT_CONFIG_PROVIDER } from './dialog.config';
import { ThyDialog } from './dialog.service';
import { DialogFooter } from './footer/dialog-footer.component';
import { DialogHeader } from './header/dialog-header.component';

@NgModule({
    imports: [
        CommonModule,
        ThySharedModule,
        PortalModule,
        OverlayModule,
        ThyButtonModule,
        ThyIconModule,
        ThyFormModule,
        FormsModule,
        ThyActionModule,
        ThyDialogContainer,
        DialogHeader,
        DialogBody,
        DialogFooter,
        ThyConfirm
    ],
    providers: [
        ThyDialog,
        THY_DIALOG_DEFAULT_OPTIONS_PROVIDER,
        THY_CONFIRM_DEFAULT_OPTIONS_PROVIDER,
        THY_DIALOG_LAYOUT_CONFIG_PROVIDER,
        {
            provide: THY_CONFIRM_COMPONENT_TOKEN,
            useValue: ThyConfirm
        }
    ],
    exports: [ThyDialogContainer, DialogHeader, DialogBody, DialogFooter]
})
export class ThyDialogModule {}
