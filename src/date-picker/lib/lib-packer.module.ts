import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CalendarFooterComponent } from './calendar/calendar-footer.component';
import { CalendarHeaderComponent } from './calendar/calendar-header.component';

import { DecadePanelComponent } from './decade/decade-panel.component';
import { MonthPanelComponent } from './month/month-panel.component';
import { DatePopupComponent } from './popups/date-popup.component';
import { InnerPopupComponent } from './popups/inner-popup.component';
import { YearPanelComponent } from './year/year-panel.component';
import { MonthTableComponent } from './month/month-table.component';
import { DateTableComponent } from './date/date-table.component';
import { DateTableCellComponent } from './date/date-table-cell.component';
import { ThyButtonModule } from '../../button/button.module';
import { ThyIconModule } from '../../icon/icon.module';
import { ThyTimePickerModule } from '../../time-picker/time-picker.module';

@NgModule({
    imports: [CommonModule, FormsModule, ThyButtonModule, ThyIconModule, ThyTimePickerModule],
    exports: [
        CalendarHeaderComponent,
        CalendarFooterComponent,
        DateTableComponent,
        YearPanelComponent,
        MonthTableComponent,
        MonthPanelComponent,
        DecadePanelComponent,
        InnerPopupComponent,
        DatePopupComponent,
        DateTableCellComponent
    ],
    declarations: [
        CalendarHeaderComponent,
        CalendarFooterComponent,
        DateTableComponent,
        YearPanelComponent,
        MonthTableComponent,
        MonthPanelComponent,
        DecadePanelComponent,
        InnerPopupComponent,
        DatePopupComponent,
        DateTableCellComponent
    ]
})
export class LibPackerModule {}
