import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { format } from 'date-fns';
import { ThyDatePicker } from 'ngx-tethys/date-picker';
import { ThyFormGroup } from 'ngx-tethys/form';

@Component({
    selector: 'thy-date-picker-date-render-example',
    templateUrl: './date-render.component.html',
    imports: [ThyFormGroup, ThyDatePicker, FormsModule]
})
export class ThyDatePickerDateRenderExampleComponent implements OnInit {
    dateTime = new Date('2023-09-01');

    sanitizer = inject(DomSanitizer);

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
        console.log(this.dateTime);
    }

    dateCellRender = () => {
        return (date: any) => {
            const formattedDate = format(date, `yyyyMMdd`);
            const restDays = ['20230910', '20230925', '20231123'];

            const workingDays = ['20230902', '20230903', '20231124'];

            let isWorkdays = workingDays.includes(formattedDate);
            let isHolidays = restDays.includes(formattedDate);

            if (isWorkdays || isHolidays) {
                const dateText = date.getDate();
                const markType = isWorkdays ? `text-success` : `text-danger`;
                const markText = isWorkdays ? `班` : `休`;
                const dateCellHtml = `<div class="thy-calendar-date" style="position:relative">${dateText}<div class="${markType}" style="position:absolute;top:-5px;right:-5px;font-size:8px;width:10px;height:10px;line-height:10px;color:white;border-radius:2px;z-index:1;display:flex;align-items:center;justify-content:center;">${markText}</div></div>`;
                return this.sanitizer.bypassSecurityTrustHtml(dateCellHtml);
            }

            return null;
        };
    };
}
