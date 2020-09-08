import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySharedModule } from '../shared';
import { ThyIconModule } from '../icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ThyTimelineComponent } from './timeline.component';
import { ThyTimelineItemComponent } from './timeline-item.component';

@NgModule({
    declarations: [ThyTimelineComponent, ThyTimelineItemComponent],
    entryComponents: [],
    imports: [CommonModule, ThySharedModule, ThyIconModule, OverlayModule, PortalModule],
    exports: [ThyTimelineComponent, ThyTimelineItemComponent],
    providers: []
})
export class ThyTimeLineModule {}
