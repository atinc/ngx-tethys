import { ThyInputModule } from 'ngx-tethys/input';
import { ThyPaginationModule } from 'ngx-tethys/pagination';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyPaginationBasicExampleComponent } from './basic/basic.component';
import { ThyPaginationCustomPagesExampleComponent } from './custom-pages/custom-pages.component';
import { ThyPaginationDisabledExampleComponent } from './disabled/disabled.component';
import { ThyPaginationJumperExampleComponent } from './jumper/jumper.component';
import { ThyPaginationMoreExampleComponent } from './more/more.component';
import { ThyPaginationSizeExampleComponent } from './size/size.component';
import { ThyPaginationTotalExampleComponent } from './total/total.component';
import { ThyPaginationUnitExampleComponent } from './unit/unit.component';

const COMPONENTS = [
    ThyPaginationBasicExampleComponent,
    ThyPaginationJumperExampleComponent,
    ThyPaginationTotalExampleComponent,
    ThyPaginationSizeExampleComponent,
    ThyPaginationMoreExampleComponent,
    ThyPaginationDisabledExampleComponent,
    ThyPaginationCustomPagesExampleComponent,
    ThyPaginationUnitExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ThyPaginationModule, ThyInputModule, FormsModule],
    exports: [...COMPONENTS]
})
export class ThyPaginationExamplesModule {}
