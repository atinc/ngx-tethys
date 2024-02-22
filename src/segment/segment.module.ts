import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThySegment } from './segment.component';
import { ThySegmentItem } from './segment-item.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyTooltipModule, ThySegment, ThySegmentItem],
    exports: [ThySegment, ThySegmentItem]
})
export class ThySegmentModule {}
