import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyNotifyComponent } from './notify.component';
import { ThyNotifyContainerComponent } from './notify-container.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { NotifyQueueStore } from './notify-queue.store';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { THY_NOTIFY_DEFAULT_CONFIG_PROVIDER } from './notify.config';
import { ThyNotifyContentComponent } from './notify-content.component';

@NgModule({
    imports: [CommonModule, OverlayModule, PortalModule, ThyIconModule],
    declarations: [ThyNotifyContainerComponent, ThyNotifyContentComponent, ThyNotifyComponent],
    exports: [ThyNotifyContainerComponent, ThyNotifyContentComponent, ThyNotifyComponent],
    providers: [NotifyQueueStore, THY_NOTIFY_DEFAULT_CONFIG_PROVIDER]
})
export class ThyNotifyModule {}
