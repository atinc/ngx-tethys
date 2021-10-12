import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateHelperService } from '../../../date-picker/date-helper.service';
import { CalendarHeader, PanelSelector } from '../calendar/calendar-header.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'date-header',
    templateUrl: '../calendar/calendar-header.component.html'
})
export class DateHeaderComponent extends CalendarHeader {
    constructor(public dateHelper: DateHelperService) {
        super(dateHelper);
    }

    getSelectors(): PanelSelector[] {
        let yearFormat = 'yyyy年';
        return [
            {
                className: `${this.prefixCls}-year-btn`,
                title: '',
                onClick: () => this.changePanel('year'),
                label: this.formatDateTime(yearFormat)
            },
            {
                className: `${this.prefixCls}-month-btn`,
                title: '',
                onClick: () => this.changePanel('month'),
                label: this.formatDateTime('MMM')
            }
        ];
    }
}
