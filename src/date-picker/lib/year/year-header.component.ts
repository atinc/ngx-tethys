import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateHelperService } from '../../../date-picker/date-helper.service';
import { CalendarHeader, PanelSelector } from '../calendar/calendar-header.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'year-header',
    templateUrl: '../calendar/calendar-header.component.html'
})
export class YearHeaderComponent extends CalendarHeader {
    get startYear(): number {
        return parseInt(`${this.value.getYear() / 10}`, 10) * 10;
    }

    get endYear(): number {
        return this.startYear + 9;
    }

    constructor(public dateHelper: DateHelperService) {
        super(dateHelper);
    }

    superPrevious(): void {
        this.changeValue(this.value.addYears(-10));
    }

    superNext(): void {
        this.changeValue(this.value.addYears(10));
    }

    getSelectors(): PanelSelector[] {
        return [
            {
                className: `${this.prefixCls}-year-btn`,
                title: '',
                onClick: () => this.changePanel('decade'),
                label: `${this.startYear}-${this.endYear}`
            }
        ];
    }
}
