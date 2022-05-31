import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThySegmentedComponent } from './segmented.component';
import { ThySegmentedItemComponent } from './segmented-item.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyTooltipModule],
    declarations: [ThySegmentedComponent, ThySegmentedItemComponent],
    exports: [ThySegmentedComponent, ThySegmentedItemComponent]
})
export class ThySegmentedModule {}
