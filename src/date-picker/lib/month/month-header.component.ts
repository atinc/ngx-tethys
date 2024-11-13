import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThyI18nTranslate } from 'ngx-tethys/i18n';
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
    imports: [NgClass, ThyIcon, ThyI18nTranslate]
})
export class MonthHeader extends CalendarHeader {
    getSelectors(): PanelSelector[] {
        let yearFormat = this.i18n.translate('datePicker.yearFormat');
        return [
            {
                className: `${this.prefixCls}-month-btn`,
                onClick: () => this.changePanel('year'),
                label: this.formatDateTime(yearFormat)
            }
        ];
    }
}
