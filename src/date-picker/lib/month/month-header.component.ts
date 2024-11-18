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
    selector: 'month-header',
    templateUrl: '../calendar/calendar-header.component.html',
    standalone: true,
    imports: [NgClass, ThyIcon]
})
export class MonthHeader extends CalendarHeader {
    getSelectors(): PanelSelector[] {
        let yearFormat = this.locale.yearFormat;
        return [
            {
                className: `${this.prefixCls}-month-btn`,
                onClick: () => this.changePanel('year'),
                label: this.formatDateTime(yearFormat)
            }
        ];
    }
}
