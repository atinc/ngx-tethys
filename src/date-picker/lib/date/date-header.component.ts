import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DateHelperService } from '../../../date-picker/date-helper.service';
import { CalendarHeader, PanelSelector } from '../calendar/calendar-header.component';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgClass } from '@angular/common';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'date-header',
    templateUrl: '../calendar/calendar-header.component.html',
    standalone: true,
    imports: [NgClass, ThyIcon]
})
export class DateHeader extends CalendarHeader {

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
