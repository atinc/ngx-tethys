import { ChangeDetectionStrategy, Component, input, model, effect, OnInit, output, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';
import { injectLocale, ThyDatePickerLocale } from 'ngx-tethys/i18n';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyInnerTimePicker } from 'ngx-tethys/time-picker';
import { coerceBooleanProperty, TinyDate } from 'ngx-tethys/util';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'calendar-footer',
    exportAs: 'calendarFooter',
    templateUrl: 'calendar-footer.component.html',
    imports: [ThyIcon, ThyInnerTimePicker, FormsModule, ThyButton]
})
export class CalendarFooter implements OnInit {
    /**
     * 是否支持设置时间 (时、分)
     */
    readonly showTime = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否展示时间 (时、分)
     */
    readonly mustShowTime = input(false, { transform: coerceBooleanProperty });

    readonly value = model<TinyDate | null>();

    readonly timeZone = input<string>();

    readonly disableTimeConfirm = input(false, { transform: coerceBooleanProperty });

    readonly selectTime = output<TinyDate>();

    readonly clickOk = output<void>();

    readonly clickRemove = output<void>();

    readonly showTimePickerChange = output<boolean>();

    readonly isShowTime = signal<boolean>(false);

    readonly isCanTime = signal<boolean>(false);

    readonly locale: Signal<ThyDatePickerLocale> = injectLocale('datePicker');

    constructor() {
        effect(() => {
            this.initTimeShowMode();
        });
    }

    ngOnInit() {
        this.initValue();
    }

    initValue(): void {
        if (!this.value()) {
            const defaultDate = new TinyDate(undefined, this.timeZone());
            this.value.set(defaultDate);
        }
    }

    onSelectTime(date: Date): void {
        this.selectTime.emit(new TinyDate(date, this.timeZone()));
    }

    onTimeOk() {
        if (this.disableTimeConfirm()) {
            return;
        }
        this.selectTime.emit(this.value()!);
        this.clickOk.emit();
    }

    onClear() {
        this.value.set(null);
        this.clickRemove.emit();
    }

    changeTimeShowMode(type: string) {
        this.isCanTime.set(type === 'can');
        this.isShowTime.set(type === 'show');

        this.showTimePickerChange.emit(this.isShowTime());
    }

    private initTimeShowMode() {
        if (this.mustShowTime()) {
            this.changeTimeShowMode('show');
        } else {
            if (this.showTime()) {
                this.changeTimeShowMode('can');
            }
        }
    }
}
