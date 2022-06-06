import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThySegmentComponent } from './segment.component';
import { ThySegmentItemComponent } from './segment-item.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyTooltipModule],
    declarations: [ThySegmentComponent, ThySegmentItemComponent],
    exports: [ThySegmentComponent, ThySegmentItemComponent]
})
export class ThySegmentModule {}
