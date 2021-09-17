import { forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, NgZone, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateHelperService } from 'ngx-tethys';
import { CalendarHeaderComponent, PanelSelector } from '../calendar/calendar-header.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'month-header',
    templateUrl: '../calendar/calendar-header.component.html'
})
export class MonthHeaderComponent extends CalendarHeaderComponent {
    constructor(protected dateHelper: DateHelperService) {
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
