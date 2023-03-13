import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateHelperService } from '../../../date-picker/date-helper.service';
import { CalendarHeader, PanelSelector } from '../calendar/calendar-header.component';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf, NgFor } from '@angular/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'year-header',
    templateUrl: '../calendar/calendar-header.component.html',
    standalone: true,
    imports: [NgIf, ThyIconComponent, NgFor]
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
