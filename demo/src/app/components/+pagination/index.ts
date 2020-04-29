import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DemoPaginationComponent } from './pagination.component';
import { DemoPaginationBasicComponent } from './basic/pagination-basic.component';
import { DemoPaginationMoreComponent } from './more/pagination-more.component';
import { DemoPaginationJumperComponent } from './jumper/pagination-jumper.component';
import { DemoPaginationRangeComponent } from './range/pagination-range.component';
import { DemoPaginationSizeComponent } from './size/pagination-size.component';
import { DemoPaginationShowTotalComponent } from './show-total/pagination-show-total.component';

@NgModule({
    declarations: [
        DemoPaginationComponent,
        DemoPaginationBasicComponent,
        DemoPaginationMoreComponent,
        DemoPaginationJumperComponent,
        DemoPaginationRangeComponent,
        DemoPaginationSizeComponent,
        DemoPaginationShowTotalComponent
    ],
    entryComponents: [
        DemoPaginationBasicComponent,
        DemoPaginationMoreComponent,
        DemoPaginationJumperComponent,
        DemoPaginationRangeComponent,
        DemoPaginationSizeComponent,
        DemoPaginationShowTotalComponent
    ],
    imports: [SharedModule],
    exports: [DemoPaginationComponent]
})
export class DemoPaginationModule {}
