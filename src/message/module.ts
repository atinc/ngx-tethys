import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyMessageComponent } from './message.component';
import { ThyMessageContainerComponent } from './message-container.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { MessageQueueStore } from './message-queue.store';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { THY_MESSAGE_DEFAULT_CONFIG_PROVIDER } from './message.config';
import { ThyMessageContentComponent } from './message-content.component';

@NgModule({
    imports: [CommonModule, OverlayModule, PortalModule, ThyIconModule],
    declarations: [ThyMessageContainerComponent, ThyMessageContentComponent, ThyMessageComponent],
    exports: [ThyMessageContainerComponent, ThyMessageContentComponent, ThyMessageComponent],
    providers: [MessageQueueStore, THY_MESSAGE_DEFAULT_CONFIG_PROVIDER]
})
export class ThyMessageModule {}
