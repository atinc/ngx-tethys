import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ThyDialogContainerComponent } from './dialog-container.component';
import { ThyDialog } from './dialog.service';
import { DialogHeaderComponent } from './header/dialog-header.component';

@NgModule({
    declarations: [ThyDialogContainerComponent, DialogHeaderComponent],
    imports: [CommonModule, PortalModule, OverlayModule],
    providers: [ThyDialog],
    entryComponents: [ThyDialogContainerComponent],
    exports: [ThyDialogContainerComponent, DialogHeaderComponent]
})
export class ThyDialogModule {}
