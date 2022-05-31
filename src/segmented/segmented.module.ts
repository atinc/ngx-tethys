import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySegmentedComponent } from './segmented.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyTooltipModule],
    declarations: [ThySegmentedComponent],
    exports: [ThySegmentedComponent]
})
export class ThySegmentedModule {}
