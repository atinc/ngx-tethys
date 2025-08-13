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
    selector: 'month-header',
    templateUrl: '../calendar/calendar-header.component.html',
    imports: [NgClass, ThyIcon]
})
export class MonthHeader extends CalendarHeader {
    getSelectors(): PanelSelector[] {
        const yearFormat = this.locale().yearFormat;
        return [
            {
                className: `${this.prefixCls}-month-btn`,
                onClick: () => this.changePanel('year'),
                label: this.formatDateTime(yearFormat)
            }
        ];
    }
}
