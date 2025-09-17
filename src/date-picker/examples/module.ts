import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { THY_DATE_PICKER_CONFIG } from 'ngx-tethys/date-picker';
import { format } from 'ngx-tethys/util';
import { ThyDatePickerBasicExampleComponent } from './basic/basic.component';
import { ThyDatePickerDirectiveExampleComponent } from './directive/directive.component';
import { ThyDatePickerDisabledDateExampleComponent } from './disabled-date/disabled-date.component';
import { ThyDatePickerDisabledExampleComponent } from './disabled/disabled.component';
import { ThyDatePickerFormatExampleComponent } from './format/format.component';
import { ThyDatePickerReadonlyExampleComponent } from './readonly/readonly.component';
import { ThyDatePickerSeparatorExampleComponent } from './separator/separator.component';
import { ThyDatePickerShortcutExampleComponent } from './shortcut/shortcut.component';
import { ThyDatePickerSizeExampleComponent } from './size/size.component';
import { ThyDatePickerSuffixIconExampleComponent } from './suffix-icon/suffix-icon.component';

export const workingDays = ['20230910', '20230925', '20231123'];

export const restDays = ['20230902', '20230903', '20231124'];
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ThyDatePickerBasicExampleComponent,
        ThyDatePickerDirectiveExampleComponent,
        ThyDatePickerDisabledExampleComponent,
        ThyDatePickerDisabledDateExampleComponent,
        ThyDatePickerFormatExampleComponent,
        ThyDatePickerReadonlyExampleComponent,
        ThyDatePickerSeparatorExampleComponent,
        ThyDatePickerShortcutExampleComponent,
        ThyDatePickerSizeExampleComponent,
        ThyDatePickerSuffixIconExampleComponent
    ],
    exports: [
        ThyDatePickerBasicExampleComponent,
        ThyDatePickerDirectiveExampleComponent,
        ThyDatePickerDisabledExampleComponent,
        ThyDatePickerDisabledDateExampleComponent,
        ThyDatePickerFormatExampleComponent,
        ThyDatePickerReadonlyExampleComponent,
        ThyDatePickerSeparatorExampleComponent,
        ThyDatePickerShortcutExampleComponent,
        ThyDatePickerSizeExampleComponent,
        ThyDatePickerSuffixIconExampleComponent
    ],
    providers: [
        {
            provide: THY_DATE_PICKER_CONFIG,
            useFactory: (sanitizer: DomSanitizer) => {
                return {
                    dateCellRender: (date: Date) => {
                        const formattedDate = format(date, 'yyyyMMdd');

                        let isWorkdays = workingDays.includes(formattedDate);
                        let isHolidays = restDays.includes(formattedDate);

                        if (isWorkdays || isHolidays) {
                            const dateText = date.getDate();
                            const markType = isWorkdays ? 'text-success' : 'text-danger';
                            const markText = isWorkdays ? '班' : '休';
                            const dateCellHtml = `<div class="thy-calendar-date" style="position:relative">${dateText}<div class="special-mark ${markType}" style="position:absolute;top:-5px;right:-5px;font-size:8px;width:10px;height:10px;line-height:10px;color:white;border-radius:2px;z-index:1;display:flex;align-items:center;justify-content:center;">${markText}</div></div>`;
                            return sanitizer.bypassSecurityTrustHtml(dateCellHtml);
                        }

                        return null;
                    }
                };
            },
            deps: [DomSanitizer]
        }
    ]
})
export class ThyDatePickerExamplesModule {}
