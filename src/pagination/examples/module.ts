import { NgModule } from '@angular/core';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyPaginationModule } from 'ngx-tethys/pagination';
import { ThyInputModule } from 'ngx-tethys/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyPaginationBasicExampleComponent } from './basic/basic.component';
import { ThyPaginationJumperExampleComponent } from './jumper/jumper.component';
import { ThyPaginationTotalExampleComponent } from './total/total.component';
import { ThyPaginationSizeExampleComponent } from './size/size.component';
import { ThyPaginationMoreExampleComponent } from './more/more.component';
import { ThyPaginationDisabledExampleComponent } from './disabled/disabled.component';

const COMPONENTS = [
    ThyPaginationBasicExampleComponent,
    ThyPaginationJumperExampleComponent,
    ThyPaginationTotalExampleComponent,
    ThyPaginationSizeExampleComponent,
    ThyPaginationMoreExampleComponent,
    ThyPaginationDisabledExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, ThyPaginationModule, ThyInputModule, FormsModule, NgxTethysModule],
    exports: [...COMPONENTS]
})
export class ThyPaginationExamplesModule {}
