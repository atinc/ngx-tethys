import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CandyDate } from '../../../core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'month-panel',
    exportAs: 'monthPanel',
    templateUrl: 'month-panel.component.html'
})
export class MonthPanelComponent {
    @Input() value: CandyDate;
    @Input() disabledDate: (date: Date) => boolean;

    @Output() readonly valueChange = new EventEmitter<CandyDate>();
    @Output() readonly yearPanelShow = new EventEmitter<void>();

    prefixCls = 'thy-calendar-month-panel';

    previousYear(): void {
        this.gotoYear(-1);
    }

    nextYear(): void {
        this.gotoYear(1);
    }

    private gotoYear(amount: number): void {
        this.value = this.value.addYears(amount);
    }
}
