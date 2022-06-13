import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThyResizableModule } from 'ngx-tethys/resizable';
import { ThyTableModule } from 'ngx-tethys/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyResizableBasicExampleComponent } from './basic/basic.component';
import { ThyResizableCustomizeExampleComponent } from './customize/customize.component';
import { ThyResizableGridExampleComponent } from './grid/grid.component';
import { ThyResizableLayoutExampleComponent } from './layout/layout.component';
import { ThyResizableLockAspectRatioExampleComponent } from './lock-aspect-ratio/lock-aspect-ratio.component';
import { ThyResizablePreviewExampleComponent } from './preview/preview.component';
import { ThyResizableTableExampleComponent } from './table/table.component';

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
    imports: [CommonModule, ThyResizableModule, ThyTableModule, ThyIconModule, ThyLayoutModule, ThyGridModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class ThyResizableExamplesModule {}
