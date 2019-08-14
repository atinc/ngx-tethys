import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyNotifyComponent } from './notify.component';
import { ThyNotifyContainerComponent } from './notify.container.component';
import { ThyNotifyService } from './notify.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThyIconModule } from '../icon';

@NgModule({
    declarations: [ThyNotifyComponent, ThyNotifyContainerComponent],
    entryComponents: [ThyNotifyContainerComponent],
    providers: [ThyNotifyService],
    imports: [CommonModule, BrowserAnimationsModule, ThyIconModule],
    exports: [ThyNotifyContainerComponent, ThyNotifyComponent]
})
export class ThyNotifyModule {}
