import { NgModule } from '@angular/core';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyResizableModule } from 'ngx-tethys/resizable';
import { CommonModule } from '@angular/common';
import { ThyResizableBasicExampleComponent } from './basic/basic.component';
import { ThyResizablePreviewExampleComponent } from './preview/preview.component';
import { ThyResizableLockAspectRatioExampleComponent } from './lock-aspect-ratio/lock-aspect-ratio.component';
import { ThyResizableCustomizeExampleComponent } from './customize/customize.component';
import { ThyResizableTableExampleComponent } from './table/table.component';
import { ThyResizableLayoutExampleComponent } from './layout/layout.component';
import { ThyResizableGridExampleComponent } from './grid/grid.component';

const COMPONENTS = [
    ThyResizableBasicExampleComponent,
    ThyResizablePreviewExampleComponent,
    ThyResizableLockAspectRatioExampleComponent,
    ThyResizableCustomizeExampleComponent,
    ThyResizableTableExampleComponent,
    ThyResizableLayoutExampleComponent,
    ThyResizableGridExampleComponent
];

@NgModule({
    imports: [CommonModule, NgxTethysModule, ThyResizableModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class ThyResizableExamplesModule {}
