import { forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, NgZone, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateHelperService } from 'ngx-tethys';
import { CalendarHeaderComponent, PanelSelector } from '../calendar/calendar-header.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'year-header',
    templateUrl: '../calendar/calendar-header.component.html'
})
export class YearHeaderComponent extends CalendarHeaderComponent {
    get startYear(): number {
        return parseInt(`${this.value.getYear() / 10}`, 10) * 10;
    }

    get endYear(): number {
        return this.startYear + 9;
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
