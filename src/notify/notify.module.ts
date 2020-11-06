import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyNotifyComponent } from './notify.component';
import { ThyNotifyContainerComponent } from './notify.container.component';
import { ThyNotifyService } from './notify.service';
import { ThyIconModule } from '../icon';
import { NotifyQueueStore } from './notify-queue.store';
import { THY_NOTIFY_DEFAULT_OPTIONS, THY_NOTIFY_DEFAULT_OPTIONS_PROVIDER } from './notify-option.interface';

@NgModule({
    declarations: [ThyNotifyComponent, ThyNotifyContainerComponent],
    entryComponents: [ThyNotifyContainerComponent],
    providers: [ThyNotifyService, NotifyQueueStore, THY_NOTIFY_DEFAULT_OPTIONS_PROVIDER],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyNotifyContainerComponent, ThyNotifyComponent]
})
export class ThyNotifyModule {}
