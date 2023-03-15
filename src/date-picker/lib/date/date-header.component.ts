import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateHelperService } from '../../../date-picker/date-helper.service';
import { CalendarHeader, PanelSelector } from '../calendar/calendar-header.component';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf, NgFor } from '@angular/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'date-header',
    templateUrl: '../calendar/calendar-header.component.html',
    standalone: true,
    imports: [NgIf, ThyIconComponent, NgFor]
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
