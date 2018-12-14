import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ThyDialogContainerComponent } from './dialog-container.component';
import { ThyDialog } from './dialog.service';

@NgModule({
    declarations: [ThyDialogContainerComponent],
    imports: [CommonModule, PortalModule, OverlayModule],
    providers: [ThyDialog],
    entryComponents: [ThyDialogContainerComponent],
    exports: [ThyDialogContainerComponent]
})
export class ThyDialogModule {}
