import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DateHelperService } from '../../../date-picker/date-helper.service';
import { CalendarHeader, PanelSelector } from '../calendar/calendar-header.component';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgIf, NgFor } from '@angular/common';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'decade-header',
    templateUrl: '../calendar/calendar-header.component.html',
    standalone: true,
    imports: [NgIf, ThyIcon, NgFor]
})
export class DecadeHeader extends CalendarHeader {
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
