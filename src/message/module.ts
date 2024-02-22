import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from 'ngx-tethys/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyMessage } from './message.component';
import { ThyMessageContainer } from './message-container.component';
import { THY_MESSAGE_DEFAULT_CONFIG_PROVIDER } from './message.config';

@NgModule({
    imports: [CommonModule, ThySharedModule, OverlayModule, PortalModule, ThyIconModule, ThyMessageContainer, ThyMessage],
    exports: [ThyMessageContainer, ThyMessage],
    providers: [THY_MESSAGE_DEFAULT_CONFIG_PROVIDER]
})
export class ThyMessageModule {}
