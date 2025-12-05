import { DomSanitizer } from '@angular/platform-browser';
import { format } from 'date-fns';
import { THY_DATE_PICKER_CONFIG } from 'ngx-tethys/date-picker';

const workingDays = ['20230910', '20230925', '20231123'];

const restDays = ['20230902', '20230903', '20231124'];
export default {
    providers: [
        {
            provide: THY_DATE_PICKER_CONFIG,
            useFactory: (sanitizer: DomSanitizer) => {
                return {
                    dateCellRender: (date: Date) => {
                        const formattedDate = format(date, `yyyyMMdd`);

                        const isWorkdays = workingDays.includes(formattedDate);
                        const isHolidays = restDays.includes(formattedDate);

                        if (isWorkdays || isHolidays) {
                            const dateText = date.getDate();
                            const markType = isWorkdays ? `text-success` : `text-danger`;
                            const markText = isWorkdays ? `班` : `休`;
                            const dateCellHtml = `<div class="thy-calendar-date" style="position:relative">${dateText}<div class="${markType}" style="position:absolute;top:-5px;right:-5px;font-size:8px;width:10px;height:10px;line-height:10px;color:white;border-radius:2px;z-index:1;display:flex;align-items:center;justify-content:center;">${markText}</div></div>`;
                            return sanitizer.bypassSecurityTrustHtml(dateCellHtml);
                        }

                        return null;
                    }
                };
            },
            deps: [DomSanitizer]
        }
    ]
};
