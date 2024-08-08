import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateHelperService } from '../../../date-picker/date-helper.service';
import { CalendarHeader, PanelSelector } from '../calendar/calendar-header.component';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgIf, NgFor, NgClass } from '@angular/common';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'month-header',
    templateUrl: '../calendar/calendar-header.component.html',
    standalone: true,
    imports: [NgIf, NgClass, ThyIcon, NgFor]
})
export class MonthHeader extends CalendarHeader {
    constructor(public dateHelper: DateHelperService) {
        super(dateHelper);
    }

    getSelectors(): PanelSelector[] {
        let yearFormat = 'yyyy年';
        return [
            {
                className: `${this.prefixCls}-month-btn`,
                onClick: () => this.changePanel('year'),
                label: this.formatDateTime(yearFormat)
            }
        ];
    }
}
