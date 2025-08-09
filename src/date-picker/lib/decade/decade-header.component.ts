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
    selector: 'decade-header',
    templateUrl: '../calendar/calendar-header.component.html',
    imports: [NgClass, ThyIcon]
})
export class DecadeHeader extends CalendarHeader {
    readonly startYear = computed<number>(() => parseInt(`${this.value().getYear() / 100}`, 10) * 100);

    readonly endYear = computed<number>(() => this.startYear() + 99);

    superPrevious(): void {
        const newValue = this.value().addYears(-100);
        this.changeValue(newValue);
    }

    superNext(): void {
        const newValue = this.value().addYears(100);
        this.changeValue(newValue);
    }

    getSelectors(): PanelSelector[] {
        return [
            {
                className: `${this.prefixCls}-decade-btn`,
                title: '',
                onClick: () => {},
                label: `${this.startYear()}-${this.endYear()}`
            }
        ];
    }
}
