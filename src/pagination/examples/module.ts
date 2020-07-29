import { NgModule } from '@angular/core';
import { NgxTethysModule } from 'ngx-tethys';

import { ThyPaginationModule } from 'ngx-tethys/pagination';
import { ThyInputModule } from 'ngx-tethys/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyPaginationBaseExampleComponent } from './base/base.component';
import { ThyPaginationJumperExampleComponent } from './jumper/jumper.component';
import { ThyPaginationShowTotalExampleComponent } from './show-total/show-total.component';
import { ThyPaginationSizeExampleComponent } from './size/size.component';

const COMPONENTS = [
    ThyPaginationBaseExampleComponent,
    ThyPaginationJumperExampleComponent,
    ThyPaginationShowTotalExampleComponent,
    ThyPaginationSizeExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, ThyPaginationModule, ThyInputModule, FormsModule, NgxTethysModule],
    exports: [...COMPONENTS]
})
export class ThyPaginationExamplesModule {}
