import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    imports: [NgClass, ThyIcon]
})
export class DateHeader extends CalendarHeader {
    getSelectors(): PanelSelector[] {
        const yearFormat = this.locale().yearFormat;
        const monthFormat = this.locale().monthFormat;

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
                label: this.formatDateTime(monthFormat)
            }
        ];
    }
}
