import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyNotifyComponent } from './notify.component';
import { ThyNotifyContainerComponent } from './notify.container.component';
import { ThyNotifyService } from './notify.service';
import { ThyIconModule } from 'ngx-tethys/icon';
import { NotifyQueueStore } from './notify-queue.store';
import { THY_NOTIFY_DEFAULT_OPTIONS, THY_NOTIFY_DEFAULT_OPTIONS_PROVIDER } from './notify-option.interface';

@NgModule({
    declarations: [ThyNotifyComponent, ThyNotifyContainerComponent],
    providers: [NotifyQueueStore, THY_NOTIFY_DEFAULT_OPTIONS_PROVIDER],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyNotifyContainerComponent, ThyNotifyComponent]
})
export class ThyNotifyModule {}
