import { Directive, OnInit, Signal, effect, inject, input, model, output } from '@angular/core';
import { ThyPanelMode } from '../../standard-types';
import { coerceBooleanProperty, TinyDate } from 'ngx-tethys/util';
import { DateHelperService } from '../../date-helper.service';
import { injectLocale, ThyDatePickerLocale } from 'ngx-tethys/i18n';

export interface PanelSelector {
    className: string;
    title?: string;
    label: string;
    onClick(): void;
}

/**
 * @private
 */
@Directive()
export abstract class CalendarHeader implements OnInit {
    protected dateHelper = inject(DateHelperService);

    protected locale: Signal<ThyDatePickerLocale> = injectLocale('datePicker');

    readonly showSuperPreBtn = input(true, { transform: coerceBooleanProperty });

    readonly showSuperNextBtn = input(true, { transform: coerceBooleanProperty });

    readonly showPreBtn = input(true, { transform: coerceBooleanProperty });

    readonly showNextBtn = input(true, { transform: coerceBooleanProperty });

    readonly value = model<TinyDate>();

    readonly valueChange = output<TinyDate>();

    readonly panelModeChange = output<ThyPanelMode>();

    abstract getSelectors(): PanelSelector[];

    protected prefixCls = 'thy-calendar';

    protected selectors: PanelSelector[] | null = null;

    constructor() {
        effect(() => {
            this.render();
        });
    }

    ngOnInit(): void {
        if (!this.value()) {
            this.value.set(new TinyDate());
        }
    }

    superPrevious(): void {
        this.gotoYear(-1);
    }

    superNext(): void {
        this.gotoYear(1);
    }

    previous(): void {
        this.gotoMonth(-1);
    }

    next(): void {
        this.gotoMonth(1);
    }

    changePanel(mode: ThyPanelMode, value?: TinyDate): void {
        this.panelModeChange.emit(mode);
    }

    selectorClick(event: Event, selector: PanelSelector) {
        event.stopPropagation();
        return selector ? selector.onClick() : null;
    }

    private render(): void {
        if (this.value()) {
            this.selectors = this.getSelectors();
        }
    }

    private gotoMonth(amount: number): void {
        this.changeValue(this.value()!.addMonths(amount));
    }

    private gotoYear(amount: number): void {
        this.changeValue(this.value()!.addYears(amount));
    }

    public changeValue(value: TinyDate): void {
        if (this.value() !== value) {
            this.value.set(value);
            this.valueChange.emit(value);
        }
    }

    formatDateTime(format: string): string {
        const date = this.value()!.nativeDate;
        return this.dateHelper.format(date, format);
    }
}
