import { forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, NgZone, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateHelperService } from 'ngx-tethys';
import { CalendarHeader, PanelSelector } from '../calendar/calendar-header.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'decade-header',
    templateUrl: '../calendar/calendar-header.component.html'
})
export class DecadeHeaderComponent extends CalendarHeader {
    get startYear(): number {
        return parseInt(`${this.value.getYear() / 10}`, 10) * 10;
    }

    get endYear(): number {
        return this.startYear + 9;
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
