import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyPopoverContainerComponent } from './popover-container.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { THY_POPOVER_DEFAULT_CONFIG_PROVIDER } from './popover.config';
import { ThyPopoverDirective } from './popover.directive';
import { ThyPopoverHeaderComponent } from './header/popover-header.component';
import { ThyPopoverBodyComponent } from './body/popover-body.component';

@NgModule({
    declarations: [ThyPopoverContainerComponent, ThyPopoverDirective, ThyPopoverHeaderComponent, ThyPopoverBodyComponent],
    entryComponents: [ThyPopoverContainerComponent],
    imports: [CommonModule, OverlayModule, PortalModule],
    exports: [ThyPopoverDirective, ThyPopoverHeaderComponent, ThyPopoverBodyComponent],
    providers: [THY_POPOVER_DEFAULT_CONFIG_PROVIDER]
})
export class ThyPopoverModule {}
