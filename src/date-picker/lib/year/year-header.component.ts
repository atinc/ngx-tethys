import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CalendarHeader, PanelSelector } from '../calendar/calendar-header.component';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgClass } from '@angular/common';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'year-header',
    templateUrl: '../calendar/calendar-header.component.html',
    imports: [NgClass, ThyIcon]
})
export class YearHeader extends CalendarHeader {
    readonly startYear = computed<number>(() => parseInt(`${this.value()!.getYear() / 10}`, 10) * 10);

    readonly endYear = computed<number>(() => this.startYear() + 9);

    superPrevious(): void {
        const newValue = this.value()!.addYears(-10);
        this.changeValue(newValue);
    }

    superNext(): void {
        const newValue = this.value()!.addYears(10);
        this.changeValue(newValue);
    }

    getSelectors(): PanelSelector[] {
        return [
            {
                className: `${this.prefixCls}-year-btn`,
                title: '',
                onClick: () => this.changePanel('decade'),
                label: `${this.startYear()}-${this.endYear()}`
            }
        ];
    }
}
