import { forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { DateHelperService } from '../../../date-picker/date-helper.service';
import { CalendarHeader, PanelSelector } from '../calendar/calendar-header.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'decade-header',
    templateUrl: '../calendar/calendar-header.component.html'
})
export class DecadeHeaderComponent extends CalendarHeader {
    constructor(public dateHelper: DateHelperService) {
        super(dateHelper);
    }
    get startYear(): number {
        return parseInt(`${this.value.getYear() / 100}`, 10) * 100;
    }

    get endYear(): number {
        return this.startYear + 99;
    }

    superPrevious(): void {
        this.changeValue(this.value.addYears(-100));
    }

    superNext(): void {
        this.changeValue(this.value.addYears(100));
    }

    getSelectors(): PanelSelector[] {
        return [
            {
                className: `${this.prefixCls}-decade-btn`,
                title: '',
                onClick: () => {},
                label: `${this.startYear}-${this.endYear}`
            }
        ];
    }
}
