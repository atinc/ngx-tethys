import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCalendarBasicExampleComponent } from './basic/basic.component';
import { ThyCalendarModule } from 'ngx-tethys/calendar';
import { LibPackerModule } from 'ngx-tethys/date-picker';
import { FormsModule } from '@angular/forms';
import { ThyBadgeModule } from 'ngx-tethys/badge';
import { ThyCalendarCustomCellExampleComponent } from './custom-cell/custom-cell.component';
import { ThyCalendarBasicYearExampleComponent } from './basic-year/basic-year.component';

const COMPONENTS = [ThyCalendarBasicExampleComponent, ThyCalendarCustomCellExampleComponent, ThyCalendarBasicYearExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, LibPackerModule, ThyCalendarModule, ThyBadgeModule],
    exports: [...COMPONENTS]
})
export class ThyCalendarExamplesModule {}
