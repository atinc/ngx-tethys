import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyNotifyComponent } from './notify.component';
import { ThyNotifyContainerComponent } from './notify-container.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { THY_NOTIFY_DEFAULT_CONFIG_PROVIDER } from './notify.config';
import { ThySharedModule } from 'ngx-tethys/shared';

@NgModule({
    imports: [CommonModule, ThySharedModule, OverlayModule, PortalModule, ThyIconModule, ThyNotifyContainerComponent, ThyNotifyComponent],
    exports: [ThyNotifyContainerComponent, ThyNotifyComponent],
    providers: [THY_NOTIFY_DEFAULT_CONFIG_PROVIDER]
})
export class ThyNotifyModule {}
