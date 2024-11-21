import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { THY_I18N_LOCALE_ID, THY_I18N_ZH_HANS, THY_I18N_EN_US, zhHansLocale, enUsLocale, ThyLocaleType } from 'ngx-tethys/i18n';
import { ThySegmentModule } from 'ngx-tethys/segment';
import { ThyI18nBasicExampleComponent } from './basic/basic.component';
import { ThyPaginationModule } from 'ngx-tethys/pagination';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyColorPickerModule } from 'ngx-tethys/color-picker';
import { ThyTimePickerModule } from 'ngx-tethys/time-picker';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyDateRangeModule } from 'ngx-tethys/date-range';
import { ThyCalendarModule } from 'ngx-tethys/calendar';
import { ThyStrengthModule } from 'ngx-tethys/strength';
import { ThyTransferModule } from 'ngx-tethys/transfer';
import { ThyCopyModule } from 'ngx-tethys/copy';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyTreeSelectModule } from 'ngx-tethys/tree-select';
import { ThyCascaderModule } from 'ngx-tethys/cascader';
import { ThyAutocompleteModule } from 'ngx-tethys/autocomplete';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyGuiderModule } from 'ngx-tethys/guider';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';

@NgModule({
    exports: [ThyI18nBasicExampleComponent],
    declarations: [ThyI18nBasicExampleComponent],
    imports: [
        CommonModule,
        FormsModule,
        ThySegmentModule,
        ThyFormModule,
        ThyPaginationModule,
        ThyDatePickerModule,
        ThyColorPickerModule,
        ThyTimePickerModule,
        ThyEmptyModule,
        ThyButtonModule,
        ThyDateRangeModule,
        ThyCalendarModule,
        ThyFormModule,
        ThyStrengthModule,
        ThyTransferModule,
        ThyCopyModule,
        ThySelectModule,
        ThyTreeSelectModule,
        ThyCascaderModule,
        ThyAutocompleteModule,
        ThyDialogModule,
        ThyInputModule,
        ThyGuiderModule,
        ThyGridModule,
        ThyNavModule,
        ThyDropdownModule
    ],
    providers: [
        {
            provide: THY_I18N_LOCALE_ID,
            useValue: ThyLocaleType.zhHans
        },
        {
            provide: THY_I18N_ZH_HANS,
            useValue: {
                ...zhHansLocale,
                calendar: {
                    ...zhHansLocale.calendar,
                    today: '今日'
                }
            }
        },
        {
            provide: THY_I18N_EN_US,
            useValue: {
                ...enUsLocale,
                guider: {
                    ...enUsLocale.guider,
                    next: 'next'
                }
            }
        }
    ]
})
export class ThyI18nExamplesModule {}
